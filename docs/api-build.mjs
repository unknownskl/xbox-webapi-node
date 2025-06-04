import { generateFiles, createGenerator } from 'fumadocs-typescript';
import * as path from 'node:path';

const generator = createGenerator()

void generateFiles(generator, {
  input: ['./content/docs/**/*.model.mdxmodel'],
  // Rename x.model.mdx to x.mdx
  output: (file) =>
    path.resolve(
      path.dirname(file),
      `${path.basename(file).split('.')[0]}.mdx`,
    ),
});