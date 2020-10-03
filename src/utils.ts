import * as vscode from 'vscode'
const fs = require('fs')
const path = require('path')
const {fileSuffix} = (<{fileSuffix: string[]}>vscode.workspace.getConfiguration().get('ts-file-skip'))

console.log(fileSuffix.join(','))

export function appointFile(name: string | undefined){
    return fileSuffix.includes(name ?? '')
}

/**
 * 通过目标的路径拼接后缀并验证该文件存在
 * @param {*} targetPath 目标路径
 * @returns 拼接上后缀名并返回
 */
export function joiningSuffix(targetPath: string) {
  const extname = path.extname(targetPath)
  if (!extname) {
    // for (const item of allowedsuffix) {
    //   if (fs.existsSync(`${targetPath}.${item}`)) {
    //     return `${targetPath}.${item}`
    //   }
    // }
    // targetPath = path.join(targetPath, 'index')
    // for (const item of allowedsuffix) {
    //   if (fs.existsSync(`${targetPath}.${item}`)) {
    //     return `${targetPath}.${item}`
    //   }
    // }
  } else if (fs.existsSync(targetPath)) {
    return targetPath
  } else {
    return undefined
  }
}
/**
 * 从文本中过滤出相对路径
 * @param {string} linetext 包含路径的字符串
 * @returns 目标路径的相对路径
 */
export function screeningRelativePath(linetext: any,position: vscode.Position) {
    let arr = linetext.match(/('.+')|(".+")/) // 正则匹配
    let text = ''
    if (arr) {
      text = arr[0].substring(1, arr[0].length - 1)
      const i = linetext.indexOf(text)
      const columns = [i, i + text.length]
      return {
        text,
        rang: new vscode.Range(position.line, columns[0], position.line, columns[1]),
        columns
      }
    }
    return {}
}