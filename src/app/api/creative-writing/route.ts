import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { type, topic } = await request.json();

    if (!type || !topic) {
      return NextResponse.json(
        { error: 'Type and topic are required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'poem':
        systemPrompt = '你是一个才华横溢的诗人，能够创作各种风格的诗歌。请根据主题创作富有诗意和美感的诗歌，注意韵律和意境的营造。';
        userPrompt = `请以"${topic}"为主题创作一首诗：`;
        break;
      case 'story':
        systemPrompt = '你是一个优秀的小说家，能够创作引人入胜的故事。请根据主题创作一个完整的故事，包含生动的情节、鲜明的人物和深刻的主题。';
        userPrompt = `请以"${topic}"为主题创作一个故事：`;
        break;
      case 'marketing':
        systemPrompt = '你是一个营销文案专家，能够撰写吸引人的营销文案。请根据产品或服务特点，创作具有说服力和吸引力的营销文案。';
        userPrompt = `请为"${topic}"创作营销文案：`;
        break;
      case 'brainstorm':
        systemPrompt = '你是一个创意思维专家，能够提供丰富的创意和想法。请围绕主题提供多样化的创意想法，包括不同的角度和可能性。';
        userPrompt = `请围绕"${topic}"进行头脑风暴，提供创意想法：`;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid creative writing type' },
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

    const result = completion.choices[0]?.message?.content || '创作失败，请稍后再试。';

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Creative writing API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}