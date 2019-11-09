// [libs]
import * as React from 'react';
import clsx from 'clsx';

// components
import Block from './components/Block';

// styles
import classes from './index.module.css';

type TBlock = {
  id: number;
  title: string;
  content: string;
  isRequired: boolean;
};

type TProps = {
  id: number;
  name: string;
  blocks: TBlock[];
  className?: string;
  onNameChange?(templateId: number, name: string): void;
  onBlocksUpdate?(templateId: number, blocks: TBlock[]): void;
  onRemoveClick?(templateId: number): void;
};

function Template(props: TProps) {
  const { id, name, blocks: propBlocks, className, onNameChange, onBlocksUpdate, onRemoveClick } = props;
  const uuid = React.useRef(0);
  const [blocks, updateBlock] = React.useState(propBlocks);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onNameChange) {
      onNameChange(id, event.target.value);
    }
  }

  function handleAddBlockClick() {
    const updatedBlocks = [
      ...blocks,
      {
        id: uuid.current++,
        title: `Title of block ${uuid.current}`,
        content: '',
        isRequired: false,
      },
    ];

    updateBlock(updatedBlocks);

    if (onBlocksUpdate) {
      onBlocksUpdate(id, updatedBlocks);
    }
  }

  function handleBlockTitleChange(blockId: number, title: string) {
    const updatedBlocks = blocks.map(item => {
      if (item.id === blockId) {
        item.title = title;
      }

      return item;
    });

    updateBlock(updatedBlocks);

    if (onBlocksUpdate) {
      onBlocksUpdate(id, updatedBlocks);
    }
  }

  function handleBlockContentChange(blockId: number, content: string) {
    const updatedBlocks = blocks.map(item => {
      if (item.id === blockId) {
        item.content = content;
      }

      return item;
    });

    updateBlock(updatedBlocks);

    if (onBlocksUpdate) {
      onBlocksUpdate(id, updatedBlocks);
    }
  }

  function handleBlockIsRequiredChange(blockId: number, checked: boolean) {
    const updatedBlocks = blocks.map(item => {
      if (item.id === blockId) {
        item.isRequired = checked;
      }

      return item;
    });

    updateBlock(updatedBlocks);

    if (onBlocksUpdate) {
      onBlocksUpdate(id, updatedBlocks);
    }
  }

  function handleBlockRemoveClick(blockId: number) {
    const filteredBlocks = blocks.filter(item => item.id !== blockId);

    updateBlock(filteredBlocks);

    if (onBlocksUpdate) {
      onBlocksUpdate(id, filteredBlocks);
    }
  }

  function handleRemoveClick() {
    if (onRemoveClick) {
      onRemoveClick(id);
    }
  }

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.title}>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      {blocks.map(item => (
        <Block
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isRequired={item.isRequired}
          className={classes.block}
          onTitleChange={handleBlockTitleChange}
          onContentChange={handleBlockContentChange}
          onIsRequiredChange={handleBlockIsRequiredChange}
          onRemoveClick={handleBlockRemoveClick}
        />
      ))}
      <button onClick={handleAddBlockClick}>Add block</button>
      <button className={classes.removeButton} onClick={handleRemoveClick}>
        Remove template
      </button>
    </div>
  );
}

export default Template;
