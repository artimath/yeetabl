import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Operation = 'sum' | 'average' | 'count' | 'min' | 'max';

type IndexField = {
  name: string;
  table: string;
  operation: Operation;
};

export function CompositeIndexBuilder() {
  const [fields, setFields] = useState<IndexField[]>([]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldTable, setNewFieldTable] = useState('');
  const [newFieldOperation, setNewFieldOperation] = useState<Operation>('sum');

  const addField = () => {
    if (newFieldName && newFieldTable) {
      setFields([...fields, { name: newFieldName, table: newFieldTable, operation: newFieldOperation }]);
      setNewFieldName('');
      setNewFieldTable('');
    }
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const createIndex = async () => {
    try {
      console.log('Creating composite index with fields:', fields);
      // Here you would implement the logic to create the index
      // You might want to send this data to your backend API
      // await api.createCompositeIndex(fields);
      // Show success message
    } catch (error) {
      console.error('Failed to create index:', error);
      // Show error message
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Field name"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
        />
        <Input
          placeholder="Table name"
          value={newFieldTable}
          onChange={(e) => setNewFieldTable(e.target.value)}
        />
        <Select
          value={newFieldOperation}
          onValueChange={(value) => setNewFieldOperation(value as Operation)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sum">Sum</SelectItem>
            <SelectItem value="average">Average</SelectItem>
            <SelectItem value="count">Count</SelectItem>
            <SelectItem value="min">Min</SelectItem>
            <SelectItem value="max">Max</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addField}>Add Field</Button>
      </div>
      <ul className="space-y-2">
        {fields.map((field, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>
              {field.operation}({field.name}) from {field.table}
            </span>
            <Button variant="destructive" onClick={() => removeField(index)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
      {fields.length > 0 && <Button onClick={createIndex}>Create Composite Index</Button>}
    </div>
  );
}
