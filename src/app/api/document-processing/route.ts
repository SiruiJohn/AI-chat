import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { type, content } = await request.json();

    if (!type || !content) {
      return NextResponse.json(
        { error: 'Type and content are required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'summary':
        systemPrompt = '你是一个专业的文档摘要助手，能够准确提炼文档的核心内容和要点。请用简洁明了的语言生成摘要，保持原文的主要信息和逻辑结构。';
        userPrompt = `请为以下文档生成摘要：\n\n${content}`;
        break;
      case 'translation':
        systemPrompt = '你是一个专业的翻译助手，能够准确翻译各种语言的内容。请保持原文的语义和语气，确保翻译自然流畅。';
        userPrompt = `请将以下内容翻译成中文：\n\n${content}`;
        break;
      case 'qa':
        systemPrompt = '你是一个智能问答助手，能够根据文档内容回答相关问题。请基于提供的信息给出准确、详细的答案。';
        userPrompt = `基于以下文档内容，请回答用户可能的问题。文档内容：\n\n${content}\n\n请提供常见问题及答案：`;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid document processing type' },
          { status: 400 }
        );
    }

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
    });

    const result = completion.choices[0]?.message?.content || '处理失败，请稍后再试。';

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Document processing API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}