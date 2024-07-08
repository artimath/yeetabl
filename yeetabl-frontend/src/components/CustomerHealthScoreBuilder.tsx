import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';

type Operator = '>' | '>=' | '=' | '<' | '<=' | 'decreased_by' | 'increased_by';
type AggregationFunction = 'sum' | 'average' | 'count' | 'min' | 'max' | 'percent_change';

type Condition = {
  field: string;
  operator: Operator;
  value: number;
  timeWindow: string;
};

type Aggregation = {
  field: string;
  function: AggregationFunction;
  timeWindow: string;
};

type SubScore = {
  name: string;
  weight: number;
  conditions: Condition[];
  aggregations: Aggregation[];
};

type CustomerHealthScore = {
  name: string;
  subScores: SubScore[];
  threshold: number;
  customerSegment: {
    mrrThreshold: number;
  };
};

export function CustomerHealthScoreBuilder() {
  const [healthScore, setHealthScore] = useState<CustomerHealthScore>({
    name: 'Customer Health Score',
    subScores: [],
    threshold: 0,
    customerSegment: {
      mrrThreshold: 10000,
    },
  });

  const [currentSubScore, setCurrentSubScore] = useState<SubScore>({
    name: '',
    weight: 25,
    conditions: [],
    aggregations: [],
  });

  const addSubScore = () => {
    if (currentSubScore.name) {
      setHealthScore({
        ...healthScore,
        subScores: [...healthScore.subScores, currentSubScore],
      });
      setCurrentSubScore({ name: '', weight: 25, conditions: [], aggregations: [] });
    }
  };

  const removeSubScore = (index: number) => {
    setHealthScore({
      ...healthScore,
      subScores: healthScore.subScores.filter((_, i) => i !== index),
    });
  };

  const addCondition = (subScoreIndex: number) => {
    const updatedSubScores = [...healthScore.subScores];
    updatedSubScores[subScoreIndex].conditions.push({
      field: '',
      operator: '>',
      value: 0,
      timeWindow: '30d',
    });
    setHealthScore({ ...healthScore, subScores: updatedSubScores });
  };

  const addAggregation = (subScoreIndex: number) => {
    const updatedSubScores = [...healthScore.subScores];
    updatedSubScores[subScoreIndex].aggregations.push({
      field: '',
      function: 'sum',
      timeWindow: '30d',
    });
    setHealthScore({ ...healthScore, subScores: updatedSubScores });
  };

  const updateCondition = (subScoreIndex: number, conditionIndex: number, field: keyof Condition, value: any) => {
    const updatedSubScores = [...healthScore.subScores];
    updatedSubScores[subScoreIndex].conditions[conditionIndex][field] = value;
    setHealthScore({ ...healthScore, subScores: updatedSubScores });
  };

  const updateAggregation = (subScoreIndex: number, aggregationIndex: number, field: keyof Aggregation, value: any) => {
    const updatedSubScores = [...healthScore.subScores];
    updatedSubScores[subScoreIndex].aggregations[aggregationIndex][field] = value;
    setHealthScore({ ...healthScore, subScores: updatedSubScores });
  };

  const createHealthScore = async () => {
    try {
      console.log('Creating Customer Health Score:', healthScore);
      // Here you would implement the logic to create the health score
      // You might want to send this data to your backend API
      // await api.createCustomerHealthScore(healthScore);
      // Show success message
    } catch (error) {
      console.error('Failed to create Customer Health Score:', error);
      // Show error message
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Customer Health Score</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Health Score Name"
            value={healthScore.name}
            onChange={(e) => setHealthScore({ ...healthScore, name: e.target.value })}
            className="mb-4"
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Customer Segment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span>MRR ≥ $</span>
                <Input
                  type="number"
                  value={healthScore.customerSegment.mrrThreshold}
                  onChange={(e) => setHealthScore({
                    ...healthScore,
                    customerSegment: { mrrThreshold: Number(e.target.value) }
                  })}
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Sub-Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Input
                  placeholder="Sub-Score Name"
                  value={currentSubScore.name}
                  onChange={(e) => setCurrentSubScore({ ...currentSubScore, name: e.target.value })}
                  className="flex-grow"
                />
                <div className="flex items-center gap-2">
                  <span>Weight:</span>
                  <Slider
                    value={[currentSubScore.weight]}
                    onValueChange={(value) => setCurrentSubScore({ ...currentSubScore, weight: value[0] })}
                    max={100}
                    step={1}
                    className="w-32"
                  />
                  <span>{currentSubScore.weight}%</span>
                </div>
                <Button onClick={addSubScore}>Add Sub-Score</Button>
              </div>
              {healthScore.subScores.map((subScore, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{subScore.name} ({subScore.weight}%)</span>
                      <Button variant="destructive" size="sm" onClick={() => removeSubScore(index)}>Remove</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2">Conditions</h4>
                    {subScore.conditions.map((condition, condIndex) => (
                      <div key={condIndex} className="flex flex-wrap gap-2 mb-2">
                        <Input
                          placeholder="Field"
                          value={condition.field}
                          onChange={(e) => updateCondition(index, condIndex, 'field', e.target.value)}
                          className="w-32"
                        />
                        <Select
                          value={condition.operator}
                          onValueChange={(value) => updateCondition(index, condIndex, 'operator', value as Operator)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Operator" />
                          </SelectTrigger>
                          <SelectContent>
                            {['>', '>=', '=', '<', '<=', 'decreased_by', 'increased_by'].map((op) => (
                              <SelectItem key={op} value={op}>{op}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="Value"
                          value={condition.value}
                          onChange={(e) => updateCondition(index, condIndex, 'value', Number(e.target.value))}
                          className="w-24"
                        />
                        <Input
                          placeholder="Time Window"
                          value={condition.timeWindow}
                          onChange={(e) => updateCondition(index, condIndex, 'timeWindow', e.target.value)}
                          className="w-24"
                        />
                      </div>
                    ))}
                    <Button size="sm" onClick={() => addCondition(index)}>Add Condition</Button>
                    
                    <h4 className="font-semibold mt-4 mb-2">Aggregations</h4>
                    {subScore.aggregations.map((aggregation, aggIndex) => (
                      <div key={aggIndex} className="flex flex-wrap gap-2 mb-2">
                        <Input
                          placeholder="Field"
                          value={aggregation.field}
                          onChange={(e) => updateAggregation(index, aggIndex, 'field', e.target.value)}
                          className="w-32"
                        />
                        <Select
                          value={aggregation.function}
                          onValueChange={(value) => updateAggregation(index, aggIndex, 'function', value as AggregationFunction)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Function" />
                          </SelectTrigger>
                          <SelectContent>
                            {['sum', 'average', 'count', 'min', 'max', 'percent_change'].map((func) => (
                              <SelectItem key={func} value={func}>{func}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Time Window"
                          value={aggregation.timeWindow}
                          onChange={(e) => updateAggregation(index, aggIndex, 'timeWindow', e.target.value)}
                          className="w-24"
                        />
                      </div>
                    ))}
                    <Button size="sm" onClick={() => addAggregation(index)}>Add Aggregation</Button>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Threshold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span>Notify when score is below:</span>
                <Input
                  type="number"
                  value={healthScore.threshold}
                  onChange={(e) => setHealthScore({ ...healthScore, threshold: Number(e.target.value) })}
                  className="w-24"
                />
              </div>
            </CardContent>
          </Card>
          
          <Button onClick={createHealthScore} className="mt-4 w-full">Create Customer Health Score</Button>
        </CardContent>
      </Card>
    </div>
  );
}
