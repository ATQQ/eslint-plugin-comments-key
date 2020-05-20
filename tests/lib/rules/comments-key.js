// https://eslint.org/docs/developer-guide/nodejs-api#ruletester
const { RuleTester } = require('eslint')

// 获取自定义的规则
const rule = require('../../../lib/rules/comments-key')

// TESTS
// 加入默认配置
const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2018 }
})

const errMsg = warnWord => `注释中含有不被允许的字符${warnWord}`

ruleTester.run('comments-key', rule, {
    valid: [
        '// sssss',
        '// fixdddd',
        `/**
        * 容十三内水s是说
        */`
    ],
    invalid: [
        {
            code: "// fixme: DDL 2020-4-28 测试内容",
            errors: [{ message: errMsg('ddl') }],
            options: [{
                keyWords: ['ddl']
            }]
        },
        {
            code: '// FIXME: DDL 2020-5-23 测试内容 \n let a = "232"',
            errors: [{ message: errMsg('fixme') }],
            rules: {
                "quotes": ["error", "double"],
            },
            options: [{
                keyWords: ['abc', 'efg', 'fixme']
            }]
        },
        {
            code: `/**
            * xxx
            * 内容
            */`,
            errors: [{ message: errMsg('xxx') }]
        },
        {
            code: '// abds asa',
            errors: [{ message: errMsg('abd') }],
            options: [{
                keyWords: ['abc', 'abd']
            }]
        }
    ]
})