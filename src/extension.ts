// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { appointFile, joiningSuffix, screeningRelativePath } from './utils';
const path = require('path')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const hoverHander = vscode.languages.registerDefinitionProvider([
        { scheme: 'file', language: 'typescript' },
        { scheme: 'file', language: 'typescriptreact' },
    ], {
        provideDefinition(document, position, token){
            // 当前文件的绝对路径 加 文件名
            const fileName = document.fileName
            // 当前文件的绝对路径
            const workDir: string = path.dirname(fileName)
            // 当前行字符串
            const linetext = document.lineAt(position).text
            const relativePathObj = screeningRelativePath(linetext, position) // 相对路径的目标路径
            let targetPath: string = path.resolve(workDir, relativePathObj.text) // 要跳转的目标路径
            let target = relativePathObj
            let fileSuffixName = relativePathObj.text?.split('.').reverse()[0]
            if(!appointFile(fileSuffixName)) return
            
            // 文件存在就返回目标文件，不存在就返回空字符串
            const usableTargetPath = joiningSuffix(targetPath) 
            if (!usableTargetPath) return
            // console.log('go to definition', usableTargetPath)
            return [
                {
                    originSelectionRange: typeof target == 'object'  ? target.rang : undefined,
                    targetRange: new vscode.Range(0,0,0,0),
                    // targetSelectionRange: new vscode.Range(0,0,0,10),
                    targetUri: vscode.Uri.file(usableTargetPath)
                }
            ]

        }
    })
    context.subscriptions.push(hoverHander)
}

// this method is called when your extension is deactivated
export function deactivate() {}
