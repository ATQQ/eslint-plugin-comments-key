# eslint-plugin-comments-key

检查注释中是否包含指定关键词的插件

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-comments-key`:

```
$ npm install eslint-plugin-comments-key --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-comments-key` globally.

## Usage

Add `comments-key` to the plugins section of your `.eslintrc` configuration file or `package.json`. You can omit the `eslint-plugin-` prefix:

`package.json` demo
```json
"eslintConfig": {
    "plugins": [
      "comments-key"
    ],
    "rules": {
      "comments-key/diy":[1,{
          "wordKeys":["fixme","xxx"]
      }]
    }
}
```

After the configuration is complete, you can see the prompts when coding and building