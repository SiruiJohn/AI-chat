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
        systemPrompt = '你是一个专业的文本摘要助手，能够准确提炼文本的核心内容和要点。请用简洁明了的语言生成摘要，保持原文的主要信息和逻辑结构。';
        userPrompt = `请为以下文本生成摘要：\n\n${content}`;
        break;
      case 'polish':
        systemPrompt = '你是一个专业的文本润色助手，能够改善文本的表达方式、语法结构和逻辑性。请保持原文的核心意思，提升文本的专业性和可读性。';
        userPrompt = `请润色以下文本，提升其表达质量和专业性：\n\n${content}`;
        break;
      case 'sentiment':
        systemPrompt = '你是一个情感分析专家，能够准确分析文本的情感倾向。请分析文本的情感是积极、消极还是中性，并给出具体的分析依据和置信度。';
        userPrompt = `请分析以下文本的情感倾向：\n\n${content}`;
        break;
      case 'keywords':
        systemPrompt = '你是一个关键词提取专家，能够从文本中提取最重要的关键词和核心概念。请提取5-10个最具代表性的关键词，并简要说明每个关键词的重要性。';
        userPrompt = `请从以下文本中提取关键词：\n\n${content}`;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid text processing type' },
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
    console.error('Text processing API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}