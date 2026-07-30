Database set-up:(Postgresql)

Table name: brews

Table columns:  
&emsp;&emsp;coffee_id INTEGER PRIMARY KEY,  
&emsp;&emsp;beans_used TEXT,  
&emsp;&emsp;brewing_method TEXT,  
&emsp;&emsp;coffee_content TEXT,  
&emsp;&emsp;water_content TEXT,  
&emsp;&emsp;preference_rating INTEGER,  
&emsp;&emsp;tasting_notes TEXT

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
