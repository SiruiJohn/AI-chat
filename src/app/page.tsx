'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MessageSquare, Image as ImageIcon, Send, Download, FileText, Code, PenTool, Wrench, Brain, Globe, Sparkles } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface GeneratedImage {
  id: string;
  prompt: string;
  imageData: string;
  timestamp: Date;
}

interface DocumentProcessingResult {
  id: string;
  type: 'summary' | 'translation' | 'qa';
  input: string;
  output: string;
  timestamp: Date;
}

interface CodeResult {
  id: string;
  type: 'generate' | 'explain' | 'optimize';
  language: string;
  input: string;
  output: string;
  timestamp: Date;
}

interface TextProcessingResult {
  id: string;
  type: 'summary' | 'polish' | 'sentiment' | 'keywords';
  input: string;
  output: string;
  timestamp: Date;
}

interface CreativeResult {
  id: string;
  type: 'poem' | 'story' | 'marketing' | 'brainstorm';
  topic: string;
  content: string;
  timestamp: Date;
}

interface UtilityResult {
  id: string;
  type: 'email' | 'meeting' | 'study' | 'health';
  input: string;
  output: string;
  timestamp: Date;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat');
  
  // Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // Image generation states
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  
  // Document processing states
  const [docType, setDocType] = useState<'summary' | 'translation' | 'qa'>('summary');
  const [docInput, setDocInput] = useState('');
  const [docResults, setDocResults] = useState<DocumentProcessingResult[]>([]);
  const [isDocLoading, setIsDocLoading] = useState(false);
  
  // Code assistant states
  const [codeType, setCodeType] = useState<'generate' | 'explain' | 'optimize'>('generate');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [codeInput, setCodeInput] = useState('');
  const [codeResults, setCodeResults] = useState<CodeResult[]>([]);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  
  // Text processing states
  const [textType, setTextType] = useState<'summary' | 'polish' | 'sentiment' | 'keywords'>('summary');
  const [textInput, setTextInput] = useState('');
  const [textResults, setTextResults] = useState<TextProcessingResult[]>([]);
  const [isTextLoading, setIsTextLoading] = useState(false);
  
  // Creative writing states
  const [creativeType, setCreativeType] = useState<'poem' | 'story' | 'marketing' | 'brainstorm'>('poem');
  const [creativeTopic, setCreativeTopic] = useState('');
  const [creativeResults, setCreativeResults] = useState<CreativeResult[]>([]);
  const [isCreativeLoading, setIsCreativeLoading] = useState(false);
  
  // Utility tools states
  const [utilityType, setUtilityType] = useState<'email' | 'meeting' | 'study' | 'health'>('email');
  const [utilityInput, setUtilityInput] = useState('');
  const [utilityResults, setUtilityResults] = useState<UtilityResult[]>([]);
  const [isUtilityLoading, setIsUtilityLoading] = useState(false);

  // Chat functionality
  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: chatInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '抱歉，我遇到了一些问题。请检查您的网络连接或稍后再试。',
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Image generation functionality
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim() || isImageLoading) return;

    setIsImageLoading(true);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt: imagePrompt,
        imageData: data.imageData,
        timestamp: new Date(),
      };

      setGeneratedImages(prev => [newImage, ...prev]);
      setImagePrompt('');
    } catch (error) {
      console.error('Error generating image:', error);
      alert('生成图片失败，请检查您的网络连接或稍后再试。');
    } finally {
      setIsImageLoading(false);
    }
  };

  // Document processing functionality
  const handleProcessDocument = async () => {
    if (!docInput.trim() || isDocLoading) return;

    setIsDocLoading(true);

    try {
      const response = await fetch('/api/document-processing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: docType, content: docInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process document');
      }

      const data = await response.json();
      const newResult: DocumentProcessingResult = {
        id: Date.now().toString(),
        type: docType,
        input: docInput,
        output: data.result,
        timestamp: new Date(),
      };

      setDocResults(prev => [newResult, ...prev]);
      setDocInput('');
    } catch (error) {
      console.error('Error processing document:', error);
      alert('文档处理失败，请检查您的网络连接或稍后再试。');
    } finally {
      setIsDocLoading(false);
    }
  };

  // Code assistant functionality
  const handleCodeProcess = async () => {
    if (!codeInput.trim() || isCodeLoading) return;

    setIsCodeLoading(true);

    try {
      const response = await fetch('/api/code-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: codeType, language: codeLanguage, code: codeInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process code');
      }

      const data = await response.json();
      const newResult: CodeResult = {
        id: Date.now().toString(),
        type: codeType,
        language: codeLanguage,
        input: codeInput,
        output: data.result,
        timestamp: new Date(),
      };

      setCodeResults(prev => [newResult, ...prev]);
      setCodeInput('');
    } catch (error) {
      console.error('Error processing code:', error);
      alert('代码处理失败，请检查您的网络连接或稍后再试。');
    } finally {
      setIsCodeLoading(false);
    }
  };

  // Text processing functionality
  const handleTextProcess = async () => {
    if (!textInput.trim() || isTextLoading) return;

    setIsTextLoading(true);

    try {
      const response = await fetch('/api/text-processing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: textType, content: textInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process text');
      }

      const data = await response.json();
      const newResult: TextProcessingResult = {
        id: Date.now().toString(),
        type: textType,
        input: textInput,
        output: data.result,
        timestamp: new Date(),
      };

      setTextResults(prev => [newResult, ...prev]);
      setTextInput('');
    } catch (error) {
      console.error('Error processing text:', error);
      alert('文本处理失败，请检查您的网络连接或稍后再试。');
    } finally {
      setIsTextLoading(false);
    }
  };

  // Creative writing functionality
  const handleCreativeProcess = async () => {
    if (!creativeTopic.trim() || isCreativeLoading) return;

    setIsCreativeLoading(true);

    try {
      const response = await fetch('/api/creative-writing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: creativeType, topic: creativeTopic }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate creative content');
      }

      const data = await response.json();
      const newResult: CreativeResult = {
        id: Date.now().toString(),
        type: creativeType,
        topic: creativeTopic,
        content: data.result,
        timestamp: new Date(),
      };

      setCreativeResults(prev => [newResult, ...prev]);
      setCreativeTopic('');
    } catch (error) {
      console.error('Error generating creative content:', error);
      alert('创意内容生成失败，请检查您的网络连接或稍后再试。');
    } finally {
      setIsCreativeLoading(false);
    }
  };

  // Utility tools functionality
  const handleUtilityProcess = async () => {
    if (!utilityInput.trim() || isUtilityLoading) return;

    setIsUtilityLoading(true);

    try {
      const response = await fetch('/api/utility-tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: utilityType, input: utilityInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process utility request');
      }

      const data = await response.json();
      const newResult: UtilityResult = {
        id: Date.now().toString(),
        type: utilityType,
        input: utilityInput,
        output: data.result,
        timestamp: new Date(),
      };

      setUtilityResults(prev => [newResult, ...prev]);
      setUtilityInput('');
    } catch (error) {
      console.error('Error processing utility request:', error);
      alert('实用工具处理失败，请检查您的网络连接或稍后再试。');
    } finally {
      setIsUtilityLoading(false);
    }
  };

  const downloadImage = (imageData: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${imageData}`;
    link.download = filename;
    link.click();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      summary: '摘要',
      translation: '翻译',
      qa: '问答',
      generate: '生成',
      explain: '解释',
      optimize: '优化',
      polish: '润色',
      sentiment: '情感分析',
      keywords: '关键词',
      poem: '诗歌',
      story: '故事',
      marketing: '营销文案',
      brainstorm: '头脑风暴',
      email: '邮件',
      meeting: '会议纪要',
      study: '学习助手',
      health: '健康建议'
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">AI 智能助手平台</h1>
          <p className="text-muted-foreground text-lg">全方位AI服务，助力您的工作与生活</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2 text-xs">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">智能对话</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2 text-xs">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">图像生成</span>
            </TabsTrigger>
            <TabsTrigger value="document" className="flex items-center gap-2 text-xs">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">文档处理</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2 text-xs">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">代码助手</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2 text-xs">
              <PenTool className="h-4 w-4" />
              <span className="hidden sm:inline">文本处理</span>
            </TabsTrigger>
            <TabsTrigger value="creative" className="flex items-center gap-2 text-xs">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">创意写作</span>
            </TabsTrigger>
            <TabsTrigger value="utility" className="flex items-center gap-2 text-xs">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">实用工具</span>
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  智能对话
                </CardTitle>
                <CardDescription>
                  与AI助手进行自然语言对话，获取答案和建议
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center text-muted-foreground py-8">
                        <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>开始与AI助手对话吧！我可以回答问题、提供建议和帮助您解决问题。</p>
                      </div>
                    )}
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              {message.role === 'user' ? '用户' : 'AI助手'}
                            </Badge>
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">AI正在思考...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="输入您的问题..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isChatLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isChatLoading || !chatInput.trim()}
                  >
                    {isChatLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Image Generation Tab */}
          <TabsContent value="image" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  图像生成
                </CardTitle>
                <CardDescription>
                  输入描述文本，AI将为您生成对应的图像
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="描述您想要生成的图像，例如：一只可爱的小猫在花园里玩耍，阳光明媚..."
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    className="min-h-[100px]"
                    disabled={isImageLoading}
                  />
                  <Button
                    onClick={handleGenerateImage}
                    disabled={isImageLoading || !imagePrompt.trim()}
                    className="self-end"
                  >
                    {isImageLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ImageIcon className="h-4 w-4" />
                    )}
                    生成图像
                  </Button>
                </div>
              </CardContent>
            </Card>

            {generatedImages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>生成的图像</CardTitle>
                  <CardDescription>
                    点击图像可以下载保存
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {generatedImages.map((image) => (
                      <div key={image.id} className="space-y-2">
                        <div className="relative group cursor-pointer">
                          <img
                            src={`data:image/png;base64,${image.imageData}`}
                            alt={image.prompt}
                            className="w-full h-48 object-cover rounded-lg"
                            onClick={() => downloadImage(image.imageData, `ai-image-${image.id}.png`)}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Download className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {image.prompt}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(image.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Document Processing Tab */}
          <TabsContent value="document" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  文档处理
                </CardTitle>
                <CardDescription>
                  智能文档处理，包括摘要生成、翻译和问答
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">处理类型</label>
                    <Select value={docType} onValueChange={(value: any) => setDocType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">文档摘要</SelectItem>
                        <SelectItem value="translation">文档翻译</SelectItem>
                        <SelectItem value="qa">文档问答</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="输入要处理的文档内容..."
                    value={docInput}
                    onChange={(e) => setDocInput(e.target.value)}
                    className="min-h-[120px]"
                    disabled={isDocLoading}
                  />
                  <Button
                    onClick={handleProcessDocument}
                    disabled={isDocLoading || !docInput.trim()}
                    className="self-end"
                  >
                    {isDocLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                    处理文档
                  </Button>
                </div>
              </CardContent>
            </Card>

            {docResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>处理结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {docResults.map((result) => (
                      <div key={result.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{getTypeLabel(result.type)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(result.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium mb-1">原文：</p>
                          <p className="text-muted-foreground mb-3 line-clamp-3">{result.input}</p>
                          <p className="font-medium mb-1">处理结果：</p>
                          <p className="whitespace-pre-wrap">{result.output}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Code Assistant Tab */}
          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  代码助手
                </CardTitle>
                <CardDescription>
                  AI代码生成、解释和优化助手
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">处理类型</label>
                    <Select value={codeType} onValueChange={(value: any) => setCodeType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="generate">代码生成</SelectItem>
                        <SelectItem value="explain">代码解释</SelectItem>
                        <SelectItem value="optimize">代码优化</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">编程语言</label>
                    <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder={codeType === 'generate' ? '描述您想要生成的代码功能...' : '输入您的代码...'}
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    className="min-h-[120px] font-mono text-sm"
                    disabled={isCodeLoading}
                  />
                  <Button
                    onClick={handleCodeProcess}
                    disabled={isCodeLoading || !codeInput.trim()}
                    className="self-end"
                  >
                    {isCodeLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Code className="h-4 w-4" />
                    )}
                    处理代码
                  </Button>
                </div>
              </CardContent>
            </Card>

            {codeResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>处理结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {codeResults.map((result) => (
                      <div key={result.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{getTypeLabel(result.type)}</Badge>
                          <Badge variant="secondary">{result.language}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(result.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm space-y-2">
                          <div>
                            <p className="font-medium mb-1">输入：</p>
                            <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                              {result.input}
                            </pre>
                          </div>
                          <div>
                            <p className="font-medium mb-1">输出：</p>
                            <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                              {result.output}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Text Processing Tab */}
          <TabsContent value="text" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5" />
                  文本处理
                </CardTitle>
                <CardDescription>
                  智能文本处理，包括摘要、润色、情感分析和关键词提取
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">处理类型</label>
                    <Select value={textType} onValueChange={(value: any) => setTextType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">文本摘要</SelectItem>
                        <SelectItem value="polish">文本润色</SelectItem>
                        <SelectItem value="sentiment">情感分析</SelectItem>
                        <SelectItem value="keywords">关键词提取</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="输入要处理的文本内容..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="min-h-[120px]"
                    disabled={isTextLoading}
                  />
                  <Button
                    onClick={handleTextProcess}
                    disabled={isTextLoading || !textInput.trim()}
                    className="self-end"
                  >
                    {isTextLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <PenTool className="h-4 w-4" />
                    )}
                    处理文本
                  </Button>
                </div>
              </CardContent>
            </Card>

            {textResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>处理结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {textResults.map((result) => (
                      <div key={result.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{getTypeLabel(result.type)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(result.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm space-y-2">
                          <div>
                            <p className="font-medium mb-1">原文：</p>
                            <p className="text-muted-foreground line-clamp-3">{result.input}</p>
                          </div>
                          <div>
                            <p className="font-medium mb-1">处理结果：</p>
                            <p className="whitespace-pre-wrap">{result.output}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Creative Writing Tab */}
          <TabsContent value="creative" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  创意写作
                </CardTitle>
                <CardDescription>
                  AI创意写作助手，生成诗歌、故事、营销文案等
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">创作类型</label>
                    <Select value={creativeType} onValueChange={(value: any) => setCreativeType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poem">诗歌</SelectItem>
                        <SelectItem value="story">故事</SelectItem>
                        <SelectItem value="marketing">营销文案</SelectItem>
                        <SelectItem value="brainstorm">头脑风暴</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="输入创作主题或关键词..."
                    value={creativeTopic}
                    onChange={(e) => setCreativeTopic(e.target.value)}
                    disabled={isCreativeLoading}
                  />
                  <Button
                    onClick={handleCreativeProcess}
                    disabled={isCreativeLoading || !creativeTopic.trim()}
                    className="self-end"
                  >
                    {isCreativeLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    生成内容
                  </Button>
                </div>
              </CardContent>
            </Card>

            {creativeResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>创作结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {creativeResults.map((result) => (
                      <div key={result.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{getTypeLabel(result.type)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(result.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm space-y-2">
                          <div>
                            <p className="font-medium mb-1">主题：</p>
                            <p className="text-muted-foreground">{result.topic}</p>
                          </div>
                          <div>
                            <p className="font-medium mb-1">创作内容：</p>
                            <p className="whitespace-pre-wrap">{result.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Utility Tools Tab */}
          <TabsContent value="utility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  实用工具
                </CardTitle>
                <CardDescription>
                  日常生活和工作中的实用AI工具
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">工具类型</label>
                    <Select value={utilityType} onValueChange={(value: any) => setUtilityType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">邮件撰写</SelectItem>
                        <SelectItem value="meeting">会议纪要</SelectItem>
                        <SelectItem value="study">学习助手</SelectItem>
                        <SelectItem value="health">健康建议</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="描述您的需求..."
                    value={utilityInput}
                    onChange={(e) => setUtilityInput(e.target.value)}
                    className="min-h-[100px]"
                    disabled={isUtilityLoading}
                  />
                  <Button
                    onClick={handleUtilityProcess}
                    disabled={isUtilityLoading || !utilityInput.trim()}
                    className="self-end"
                  >
                    {isUtilityLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Wrench className="h-4 w-4" />
                    )}
                    生成建议
                  </Button>
                </div>
              </CardContent>
            </Card>

            {utilityResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>处理结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {utilityResults.map((result) => (
                      <div key={result.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{getTypeLabel(result.type)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(result.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm space-y-2">
                          <div>
                            <p className="font-medium mb-1">需求：</p>
                            <p className="text-muted-foreground line-clamp-2">{result.input}</p>
                          </div>
                          <div>
                            <p className="font-medium mb-1">建议：</p>
                            <p className="whitespace-pre-wrap">{result.output}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}