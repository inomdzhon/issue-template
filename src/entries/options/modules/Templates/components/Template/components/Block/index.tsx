// [libs]
import * as React from 'react';
import clsx from 'clsx';

// styles
import classes from './index.module.css';

type TProps = {
  id: number;
  title: string;
  content: string;
  isRequired: boolean;
  className?: string;
  onTitleChange?(blockId: number, title: string): void;
  onContentChange?(blockId: number, title: string): void;
  onIsRequiredChange?(blockId: number, checked: boolean): void;
  onRemoveClick?(blockId: number): void;
};

function Block(props: TProps) {
  const { id, title, content, isRequired, className, onTitleChange, onContentChange, onIsRequiredChange, onRemoveClick } = props;

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onTitleChange) {
      onTitleChange(id, event.target.value);
    }
  }

  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (onContentChange) {
      onContentChange(id, event.target.value);
    }
  }

  function handleIsRequiredChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onIsRequiredChange) {
      onIsRequiredChange(id, event.target.checked);
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
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <textarea placeholder="Content" value={content} onChange={handleContentChange} />
      </div>
      <label>
        <input type="checkbox" checked={isRequired} onChange={handleIsRequiredChange} /> Required
      </label>
      <button className={classes.removeButton} onClick={handleRemoveClick}>
        Remove block
      </button>
    </div>
  );
}

export default Block;
