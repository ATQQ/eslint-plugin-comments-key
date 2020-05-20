module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Not allowed comment words", // 规则的简述
            category: "Stylistic Issues", // 规则分类
            recommended: true //  配置文件中的 "extends": "eslint:recommended"属性是否启用该规则
        },
        // https://cn.eslint.org/docs/developer-guide/working-with-rules#options-schemas
        schema: [ // 指定该选项 这样的 ESLint 可以避免无效的规则配置
            // 遵循 json schema
            // http://json-schema.org/
            {
                "keyWords": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        ]
    },
    create: function (context) {
        // context对象包含与规则上下文相关的信息
        // 返回一个SourceCode对象，你可以使用该对象处理传递给 ESLint 的源代码
        const sourceCode = context.getSourceCode()

        // 定义不被允许出现在注释中的内容
        // 可以使用 context.options检索一个规则的可选项，它是个数组，包含该规则的所有配置的可选项
        // https://cn.eslint.org/docs/developer-guide/working-with-rules#contextoptions
        // console.log(context.options);

        let [argv0] = context.options
        let keyWords = argv0 ? argv0.keyWords ? argv0.keyWords.length > 0 ? argv0.keyWords : undefined : undefined : undefined
        let notAllowWords = keyWords || ['fixme', 'xxx']

        // 忽略大小写
        notAllowWords = notAllowWords.map(v => v.toLowerCase())
        return {
            Program(node) {
                // 获取所有注释的节点
                const comments = sourceCode.getAllComments()
                // 遍历注释节点判断是否有不符合规范的
                comments.forEach(comment => {
                    let { loc, value, type } = comment
                    value = value.toLowerCase()
                    let warnWord = ''
                    // 判断注释内容是否包含不被允许的word
                    for (const word of notAllowWords) {
                        if (value.includes(word)) {
                            warnWord = word
                        }
                    }

                    if (warnWord) {
                        context.report({
                            node: comment, // 可选 与问题有关的 AST 节点
                            message: `注释中含有不被允许的字符${warnWord}` // 有问题发出的消息
                        })
                    }
                })
            }
        };
    }
};