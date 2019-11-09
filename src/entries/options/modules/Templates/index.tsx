// [libs]
import * as React from 'react';

// components
import Template from './components/Template';

// styles
import classes from './index.module.css';

type TBlock = {
  id: number;
  title: string;
  content: string;
  isRequired: boolean;
};

type TTemplate = {
  id: number;
  name: string;
  blocks: TBlock[];
};

type TProps = {
  className?: string;
};

function Templates(props: TProps) {
  const { className } = props;
  const uuid = React.useRef(0);
  const [templates, updateTemplate] = React.useState<TTemplate[]>([]);

  function handleAddTemplateClick() {
    updateTemplate([
      ...templates,
      {
        id: uuid.current++,
        name: `New Template ${uuid.current}`,
        blocks: [],
      },
    ]);
  }

  function handleTemplateNameChange(templateId: number, name: string) {
    updateTemplate(
      templates.map(item => {
        if (item.id === templateId) {
          item.name = name;
        }

        return item;
      }),
    );
  }

  function handleTemplateBlockUpdate(templateId: number, blocks: TBlock[]) {
    updateTemplate(
      templates.map(item => {
        if (item.id === templateId) {
          item.blocks = blocks;
        }

        return item;
      }),
    );
  }

  function handleTemplateRemoveClick(templateId: number) {
    updateTemplate(templates.filter(item => item.id !== templateId));
  }

  return (
    <div className={className}>
      {templates.length ? (
        <ul className={classes.list}>
          {templates.map(item => (
            <li key={item.id} className={classes.item}>
              <Template
                id={item.id}
                name={item.name}
                blocks={item.blocks}
                onNameChange={handleTemplateNameChange}
                onBlocksUpdate={handleTemplateBlockUpdate}
                onRemoveClick={handleTemplateRemoveClick}
              />
            </li>
          ))}
        </ul>
      ) : null}
      <button onClick={handleAddTemplateClick}>Create new template</button>
    </div>
  );
}

export default Templates;
