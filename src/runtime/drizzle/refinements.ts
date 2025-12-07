import { loadFile, generateCode } from 'magicast'
import { visit } from 'recast'
import type { ASTNode } from 'magicast'
import { logger } from '../utils/logger'

export interface TableRefinements {
  select?: string
  insert?: string
  update?: string
}

export async function extractRefinements(schemaFiles: string[]) {
  const refinements = new Map<string, TableRefinements>()

  for (const file of schemaFiles) {
    const module = await loadFile(file)
    logger.debug(`Parsing refinements from: ${file}`)

    visit(module.$ast, {
      visitVariableDeclarator(path) {
        const node = path.node

        if (
          node.init?.type === 'CallExpression' &&
          node.init.callee.type === 'Identifier'
        ) {
          const match = node.init.callee.name.match(
            /^create(Select|Insert|Update)Schema$/
          )

          if (match?.[1] && node.init.arguments.length >= 2) {
            const [tableArg, refinementArg] = node.init.arguments

            if (tableArg?.type === 'Identifier' && refinementArg) {
              const tableName = tableArg.name
              const schemaType =
                match[1].toLowerCase() as keyof TableRefinements

              if (!refinements.has(tableName)) {
                refinements.set(tableName, {})
              }

              // Generate code from the refinement argument
              // Cast to ASTNode to work with magicast's generateCode
              const refinementCode = generateCode(refinementArg as ASTNode).code
              const tableRefinement = refinements.get(tableName)
              if (tableRefinement) {
                tableRefinement[schemaType] = refinementCode
              }
            }
          }
        }

        this.traverse(path)
      },
    })
  }

  return refinements
}
