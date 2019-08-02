function getTaskTemplateForBackend() {
  return `<h3>Что было затронуто кроме основной задачи?</h3>
...
<h3>Что мы не сделали или сделали по-другому?</h3>
...
<h3>На что уделить особое внимание?</h3>
...
<h3>Как собрать сборку?</h3>
Ветка backend
<ul>
  <li></li>
</ul>
Ветки сервисов
<ul>
  <li></li>
</ul>
`;
}

function getTaskTemplateFrontend() {
  return `<h3>Что было затронуто кроме основной задачи?</h3>
...
<h3><span style="color: #ff5630">*</span>Чек лист был прогнан? Да/Нет</h3>
...
<h3>Что мы не сделали или сделали по-другому?</h3>
...
<h3>На что уделить особое внимание?</h3>
...
<h3>Как собрать сборку?</h3>
<ul>
  <li>Ссылка на задачу backend: </li>
</ul>
`;
}

function getTaskTemplateForMobile() {
  return `<h3>Что было затронуто кроме основной задачи?</h3>
...
<h3><span style="color: #ff5630">*</span>Чек лист был прогнан? Да/Нет</h3>
...
<h3>Что мы не сделали или сделали по-другому?</h3>
...
<h3>На что уделить особое внимание?</h3>
...
<h3>Как собрать сборку?</h3>
<ul>
  <li>Ссылка на задачу backend: </li>
  <li>Ссылка на задачу frontend: </li>
</ul>
`;
}

function getBugTemplate() {
  return `<h3><span style="color: #ff5630">*</span>Шаги воспроизведения</h3>
...
<h3><span style="color: #ff5630">*</span>Ожидаемый результат</h3>
...
<h3><span style="color: #ff5630">*</span>Фактический результат</h3>
...
<h3>Скриншоты</h3>
...
`;
}

function getScriptOfTemplateInjectAsString(template) {
  return `
var editableField = '';

if ('innerHTML' in document.activeElement) {
  editableField = 'innerHTML';
}

if (editableField) {
  document.activeElement[editableField] += \`<hr />${template}\`;
}
`;
}

function handleInstalled() {
  chrome.contextMenus.create({
    title: "Backend",
    contexts: ["editable"],
    onclick(_info, tab) {
      chrome.tabs.executeScript(tab.id, { code: getScriptOfTemplateInjectAsString(getTaskTemplateForBackend()) });
    }
  });

  chrome.contextMenus.create({
    title: "Frontend",
    contexts: ["editable"],
    onclick(_info, tab) {
      chrome.tabs.executeScript(tab.id, { code: getScriptOfTemplateInjectAsString(getTaskTemplateFrontend()) });
    }
  });

  chrome.contextMenus.create({
    title: "Mobile",
    contexts: ["editable"],
    onclick(_info, tab) {
      chrome.tabs.executeScript(tab.id, { code: getScriptOfTemplateInjectAsString(getTaskTemplateForMobile()) });
    }
  });

  chrome.contextMenus.create({
    title: "Bug",
    contexts: ["editable"],
    onclick(_info, tab) {
      chrome.tabs.executeScript(tab.id, { code: getScriptOfTemplateInjectAsString(getBugTemplate()) });
    }
  });
}

chrome.runtime.onInstalled.addListener(handleInstalled);
