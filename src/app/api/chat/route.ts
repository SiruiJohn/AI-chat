import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: '你是一个智能助手，能够回答用户的问题，提供有用的信息和建议。请用中文回复，保持友好和专业的语气。'
        },
        {
          role: 'user',
          content: message
        }
      ],
    });

    const response = completion.choices[0]?.message?.content || '抱歉，我无法生成回复。';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}