"use client"

import React, { useCallback, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Brain, Trash2, Upload, FileText, Wand2 } from 'lucide-react'
import { Quiz, Question } from '@/validation/course'
import { useCourseStore } from '@/stores/courseStore'

interface AIGenerationParams {
  numberOfQuizzes: number
  questionsPerQuiz: number
  difficultyLevel: 'easy' | 'medium' | 'hard'
  questionTypes: ('mcq' | 'true_false' | 'short_answer')[]
  context: string
}

type TabType = 'manual' | 'upload' | 'ai'

const Step3Quizzes: React.FC = React.memo(() => {
  // Zustand store for quizzes and questionBank
  const quizzes = useCourseStore((state) => state.quizzes)
  const setQuizzes = useCourseStore((state) => state.setQuizzes)
  // If you want to support questionBank, add to store and use here

  const [activeTab, setActiveTab] = useState<TabType>('manual')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [aiParams, setAiParams] = useState<AIGenerationParams>({
    numberOfQuizzes: 1,
    questionsPerQuiz: 5,
    difficultyLevel: 'medium',
    questionTypes: ['mcq'],
    context: ''
  })

  // Quiz actions
  const addQuiz = useCallback(() => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: `Quiz ${quizzes.length + 1}`,
      type: 'manual',
      questions: [],
      attempts: 1
    }
    setQuizzes([...quizzes, newQuiz])
  }, [quizzes, setQuizzes])

  const updateQuiz = useCallback((index: number, updates: Partial<Quiz>) => {
    const updatedQuizzes = [...quizzes]
    updatedQuizzes[index] = { ...updatedQuizzes[index], ...updates }
    setQuizzes(updatedQuizzes)
  }, [quizzes, setQuizzes])

  const removeQuiz = useCallback((index: number) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index)
    setQuizzes(updatedQuizzes)
  }, [quizzes, setQuizzes])

  // Question actions
  const addQuestion = useCallback((quizIndex: number) => {
    const question: Question = {
      id: Date.now().toString(),
      text: '',
      type: 'mcq',
      options: ['', '', '', ''],
      correctAnswer: ''
    }
    const updatedQuizzes = [...quizzes]
    updatedQuizzes[quizIndex] = {
      ...updatedQuizzes[quizIndex],
      questions: [...updatedQuizzes[quizIndex].questions, question]
    }
    setQuizzes(updatedQuizzes)
  }, [quizzes, setQuizzes])

  const updateQuestion = useCallback((quizIndex: number, questionIndex: number, updates: Partial<Question>) => {
    const updatedQuizzes = [...quizzes]
    updatedQuizzes[quizIndex].questions[questionIndex] = {
      ...updatedQuizzes[quizIndex].questions[questionIndex],
      ...updates
    }
    setQuizzes(updatedQuizzes)
  }, [quizzes, setQuizzes])

  const removeQuestion = useCallback((quizIndex: number, questionIndex: number) => {
    const updatedQuizzes = [...quizzes]
    updatedQuizzes[quizIndex].questions = updatedQuizzes[quizIndex].questions.filter((_, i) => i !== questionIndex)
    setQuizzes(updatedQuizzes)
  }, [quizzes, setQuizzes])

  // File upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setUploadedFile(file)
  }
  const validateAndParseFile = () => {
    if (!uploadedFile) return
    // TODO: Implement file validation logic
  }

  // AI Generation
  const generateQuizzesWithAI = () => {
    // TODO: Implement AI quiz generation
  }
  const updateAIParams = (updates: Partial<AIGenerationParams>) => {
    setAiParams(prev => ({ ...prev, ...updates }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Course Quizzes
        </CardTitle>
        <CardDescription>
          Create assessments using file upload, manual creation, or AI generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Manual
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              AI Generate
            </TabsTrigger>
          </TabsList>

          {/* Manual Quiz Creation */}
          <TabsContent value="manual" className="space-y-6 mt-6">
            {/* Add Quiz Button */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Quizzes ({quizzes.length})</h3>
              <Button type="button" onClick={addQuiz} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Quiz
              </Button>
            </div>

            {/* Quizzes List */}
            <div className="space-y-4">
              {quizzes.map((quiz, quizIndex) => (
                <Card key={quiz.id} className="p-4">
                  <div className="space-y-4">
                    {/* Quiz Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">
                          Quiz {quizIndex + 1}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuiz(quizIndex)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Quiz Title */}
                    <div className="space-y-2">
                      <Label>Quiz Title</Label>
                      <Input
                        value={quiz.title}
                        onChange={(e) => updateQuiz(quizIndex, { title: e.target.value })}
                        placeholder="Enter quiz title"
                      />
                    </div>

                    {/* Quiz Settings */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Time Limit (minutes)</Label>
                        <Input
                          type="number"
                          value={quiz.timeLimit || ''}
                          onChange={(e) => updateQuiz(quizIndex, { timeLimit: parseInt(e.target.value) || undefined })}
                          placeholder="No time limit"
                          min={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Auto-correct</Label>
                        <Select
                          value={quiz.autoCorrect ? 'yes' : 'no'}
                          onValueChange={(value) => updateQuiz(quizIndex, { autoCorrect: value === 'yes' })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Questions Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">
                          Questions ({quiz.questions.length})
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addQuestion(quizIndex)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Question
                        </Button>
                      </div>

                      {quiz.questions.map((question, questionIndex) => (
                        <div key={question.id} className="p-3 bg-gray-50 rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Question {questionIndex + 1}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeQuestion(quizIndex, questionIndex)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Label>Question Text</Label>
                            <Textarea
                              value={question.text}
                              onChange={(e) => updateQuestion(quizIndex, questionIndex, { text: e.target.value })}
                              placeholder="Enter your question..."
                              rows={2}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Question Type</Label>
                              <Select
                                value={question.type}
                                onValueChange={(value: 'mcq' | 'true_false' | 'short_answer') => 
                                  updateQuestion(quizIndex, questionIndex, { type: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mcq">Multiple Choice</SelectItem>
                                  <SelectItem value="true_false">True/False</SelectItem>
                                  <SelectItem value="short_answer">Short Answer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Correct Answer</Label>
                              <Input
                                value={question.correctAnswer}
                                onChange={(e) => updateQuestion(quizIndex, questionIndex, { correctAnswer: e.target.value })}
                                placeholder="Enter correct answer"
                              />
                            </div>
                          </div>

                          {question.type === 'mcq' && question.options && (
                            <div className="space-y-2">
                              <Label>Options</Label>
                              {question.options.map((option, optionIndex) => (
                                <Input
                                  key={optionIndex}
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...(question.options || [])]
                                    newOptions[optionIndex] = e.target.value
                                    updateQuestion(quizIndex, questionIndex, { options: newOptions })
                                  }}
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* File Upload */}
          <TabsContent value="upload" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Quiz File
                </CardTitle>
                <CardDescription>
                  Upload a file containing questions and answers (CSV, Excel, or JSON format)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select File</Label>
                  <Input
                    type="file"
                    accept=".csv,.xlsx,.xls,.json"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500">
                    Supported formats: CSV, Excel (.xlsx, .xls), JSON
                  </p>
                </div>

                {uploadedFile && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        {uploadedFile.name} selected
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      File size: {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}

                <Button 
                  onClick={validateAndParseFile}
                  disabled={!uploadedFile}
                  className="w-full"
                >
                  Validate & Import Quizzes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Generation */}
          <TabsContent value="ai" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  AI Quiz Generation
                </CardTitle>
                <CardDescription>
                  Provide context and parameters for AI to generate quizzes automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Context */}
                <div className="space-y-2">
                  <Label>Course Context & Materials</Label>
                  <Textarea
                    value={aiParams.context}
                    onChange={(e) => updateAIParams({ context: e.target.value })}
                    placeholder="Provide course materials, topics, or context for quiz generation..."
                    rows={4}
                  />
                </div>

                {/* Generation Parameters */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Number of Quizzes</Label>
                    <Input
                      type="number"
                      value={aiParams.numberOfQuizzes}
                      onChange={(e) => updateAIParams({ numberOfQuizzes: parseInt(e.target.value) })}
                      min={1}
                      max={10}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Questions per Quiz</Label>
                    <Input
                      type="number"
                      value={aiParams.questionsPerQuiz}
                      onChange={(e) => updateAIParams({ questionsPerQuiz: parseInt(e.target.value) })}
                      min={1}
                      max={20}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Difficulty Level</Label>
                    <Select
                      value={aiParams.difficultyLevel}
                      onValueChange={(value: 'easy' | 'medium' | 'hard') => 
                        updateAIParams({ difficultyLevel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Question Types</Label>
                    <Select
                      value={aiParams.questionTypes.join(',')}
                      onValueChange={(value) => 
                        updateAIParams({ questionTypes: value.split(',') as ('mcq' | 'true_false' | 'short_answer')[] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice</SelectItem>
                        <SelectItem value="true_false">True/False</SelectItem>
                        <SelectItem value="short_answer">Short Answer</SelectItem>
                        <SelectItem value="mcq,true_false">MCQ + True/False</SelectItem>
                        <SelectItem value="mcq,short_answer">MCQ + Short Answer</SelectItem>
                        <SelectItem value="mcq,true_false,short_answer">All Types</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={generateQuizzesWithAI}
                  disabled={!aiParams.context.trim()}
                  className="w-full"
                >
                  Generate Quizzes with AI
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
})

Step3Quizzes.displayName = 'Step3Quizzes'
export default Step3Quizzes