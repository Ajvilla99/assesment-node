// src/scripts/makeModule.js
import fs from "fs";
import path from "path";

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Please provide a module name. Example:");
  console.error("   npm run make:module user");
  process.exit(1);
}

const basePath = path.resolve("src/modules", moduleName);
fs.mkdirSync(basePath, { recursive: true });

// ✅ Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ✅ All files to generate
const files = [
  {
    name: `${moduleName}.controller.ts`,
    content: `// ${moduleName}.controller.ts
import { Request, Response } from 'express';
import { ${capitalize(moduleName)}Service } from './${moduleName}.service';

const service = new ${capitalize(moduleName)}Service();

export const getAll${capitalize(moduleName)} = async (req: Request, res: Response) => {
  const data = await service.getAll();
  res.json(data);
};
`,
  },
  {
    name: `${moduleName}.dao.ts`,
    content: `// ${moduleName}.dao.ts
export class ${capitalize(moduleName)}DAO {
  async findAll() {
    // Database logic would go here
    return [];
  }
}
`,
  },
  {
    name: `${moduleName}.dto.ts`,
    content: `// ${moduleName}.dto.ts
export interface ${capitalize(moduleName)}DTO {
  id?: number;
  name: string;
}
`,
  },
  {
    name: `${moduleName}.model.ts`,
    content: `// ${moduleName}.model.ts
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';

export const ${capitalize(moduleName)} = sequelize.define('${moduleName}', {
  id_${moduleName}: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
`,
  },
  {
    name: `${moduleName}.route.ts`,
    content: `// ${moduleName}.route.ts
import { Router } from 'express';
import { getAll${capitalize(moduleName)} } from './${moduleName}.controller';

const router = Router();

router.get('/', getAll${capitalize(moduleName)});

export default router;
`,
  },
  {
    name: `${moduleName}.service.ts`,
    content: `// ${moduleName}.service.ts
import { ${capitalize(moduleName)}DAO } from './${moduleName}.dao';

export class ${capitalize(moduleName)}Service {
  private dao = new ${capitalize(moduleName)}DAO();

  async getAll() {
    return this.dao.findAll();
  }
}
`,
  },
  {
    name: `${moduleName}.test.ts`,
    content: `// ${moduleName}.test.ts
import request from 'supertest';
import app from '../../server';

describe('${capitalize(moduleName)} Module', () => {
  it('should return 200 on GET /api/${moduleName}', async () => {
    const res = await request(app).get('/api/${moduleName}');
    expect(res.statusCode).toBe(200);
  });
});
`,
  },
  {
    name: `index.ts`,
    content: `// index.ts
export * from './${moduleName}.controller';
export * from './${moduleName}.dao';
export * from './${moduleName}.dto';
export * from './${moduleName}.model';
export { default as ${moduleName}Routes } from './${moduleName}.route';
export * from './${moduleName}.service';
`,
  },
];

// ✅ Generate all files
files.forEach((file) => {
  const filePath = path.join(basePath, file.name);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, file.content);
    console.log(`✅ Created: ${filePath}`);
  } else {
    console.log(`⚠️ Skipped (already exists): ${filePath}`);
  }
});
