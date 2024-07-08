import React from 'react';
import { eventTables } from '../dummyData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const SchemaViewer: React.FC = () => {
  return (
    <div className="space-y-6">
      {Object.entries(eventTables).map(([tableName, tableData]) => (
        <Card key={tableName}>
          <CardHeader>
            <CardTitle>{tableName}</CardTitle>
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
                {Object.entries(tableData.schema).map(([field, type]) => (
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
                  {Object.keys(tableData.schema).map((field) => (
                    <TableHead key={field}>{field}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.sample.map((row, index) => (
                  <TableRow key={index}>
                    {Object.keys(tableData.schema).map((field) => (
                      <TableCell key={field}>{row[field]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
