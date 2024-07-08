import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';

type IndexField = {
  name: string;
  type: 'record' | 'metric' | 'aggregate';
};

export function CompositeIndexBuilder() {
  const [fields, setFields] = useState<IndexField[]>([]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<IndexField['type']>('record');

  const addField = () => {
    if (newFieldName) {
      setFields([...fields, { name: newFieldName, type: newFieldType }]);
      setNewFieldName('');
    }
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const createIndex = async () => {
    try {
      // Here you would implement the logic to create the index
      console.log('Creating index with fields:', fields);
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
        <Select
          value={newFieldType}
          onValueChange={(value: IndexField['type']) => setNewFieldType(value)}
        >
          <Select.Option value="record">Record</Select.Option>
          <Select.Option value="metric">Metric</Select.Option>
          <Select.Option value="aggregate">Aggregate</Select.Option>
        </Select>
        <Button onClick={addField}>Add Field</Button>
      </div>
      <ul className="space-y-2">
        {fields.map((field, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>
              {field.name} ({field.type})
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
