import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const MsDaxLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Identifier: t.variableName,
        String: t.string,
		Return: t.keyword,
		VAR: t.keyword,
		EVALUATE: t.keyword,
        LineComment: t.lineComment,
		// "FunctionCall/FunctionWithArgs/Identifier FunctionCall/FunctionNoArg/Identifier": t.function,
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

export function msdax() {
  return new LanguageSupport(MsDaxLanguage)
}