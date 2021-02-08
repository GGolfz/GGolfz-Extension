const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "ggolfz" is now active!');
  let activate = vscode.commands.registerCommand(
    "ggolfz.activate",
    function () {
      vscode.window.showInformationMessage(
        "Activated GGolfz Extension Success"
      );
    }
  );
  let sayit = vscode.commands.registerCommand("ggolfz.sayit", function () {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    let selection = editor.selection;
    let selectionText = editor.document.getText(selection);
    vscode.window.showInformationMessage(selectionText);
  });
  let space = vscode.commands.registerCommand("ggolfz.space", function () {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    let selection = editor.selection;
    let selectionText = editor.document.getText(selection);
    let spaced_sentence = spaceIt(selectionText);
    vscode.window.showInformationMessage(
      `Copy " ${spaced_sentence} " to clipboard success`
    );
    vscode.env.clipboard.writeText(spaced_sentence);
  });
  let uppercase = vscode.commands.registerCommand("ggolfz.uppercase", function () {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    let selection = editor.selection;
    let selectionText = editor.document.getText(selection);
    let upperText = selectionText.toUpperCase();
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, upperText);
    });
    vscode.window.showInformationMessage(
      `Make " ${selectionText} " to UPPERCASE success`
    );
  });
  let lowercase = vscode.commands.registerCommand("ggolfz.lowercase", function () {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    let selection = editor.selection;
    let selectionText = editor.document.getText(selection);
    let lowerText = selectionText.toLowerCase();
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, lowerText);
    });
    vscode.window.showInformationMessage(
      `Make " ${selectionText} " to lowercase success`
    );
  });
  context.subscriptions.push(activate);
  context.subscriptions.push(sayit);
  context.subscriptions.push(space);
  context.subscriptions.push(uppercase);
  context.subscriptions.push(lowercase);
}
const spaceIt = (sentence) => {
  let temp = sentence.trim().split("");
  let spaced_sentence = temp.join(" ");
  const special = [
    "ิ",
    "ี",
    "ึ",
    "ื",
    "็",
    "ั",
    "ุ",
    "ู",
    "์",
    "ํ",
    "่",
    "้",
    "๊",
    "๋",
    " ",
  ];
  for (let i of special) {
    const regex = new RegExp(" " + i, "g");
    spaced_sentence = spaced_sentence.replace(regex, i);
  }
  return spaced_sentence;
};
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
