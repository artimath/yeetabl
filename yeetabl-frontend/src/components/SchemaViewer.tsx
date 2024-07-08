import React, { useState } from 'react';
import { eventTables } from '../dummyData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SchemaViewer: React.FC = () => {
  const tableNames = Object.keys(eventTables);
  const [currentTableIndex, setCurrentTableIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentTableIndex((prev) => (prev > 0 ? prev - 1 : tableNames.length - 1));
  };

  const handleNext = () => {
    setCurrentTableIndex((prev) => (prev < tableNames.length - 1 ? prev + 1 : 0));
  };

  const currentTableName = tableNames[currentTableIndex];
  const currentTableData = eventTables[currentTableName];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Select
          value={currentTableName}
          onValueChange={(value) => setCurrentTableIndex(tableNames.indexOf(value))}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a table" />
          </SelectTrigger>
          <SelectContent>
            {tableNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{currentTableName}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Schema</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(currentTableData.schema).map(([field, type]) => (
                <TableRow key={field}>
                  <TableCell>{field}</TableCell>
                  <TableCell>{type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h3 className="text-lg font-semibold mt-4 mb-2">Sample Data</h3>
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(currentTableData.schema).map((field) => (
                  <TableHead key={field}>{field}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTableData.sample.map((row, index) => (
                <TableRow key={index}>
                  {Object.keys(currentTableData.schema).map((field) => (
                    <TableCell key={field}>{row[field]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
