import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { type, language, code } = await request.json();

    if (!type || !language || !code) {
      return NextResponse.json(
        { error: 'Type, language, and code are required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'generate':
        systemPrompt = `你是一个专业的${language}开发工程师，能够根据需求生成高质量、可维护的代码。请生成完整的代码实现，包含必要的注释和错误处理。`;
        userPrompt = `请使用${language}语言实现以下功能：\n\n${code}`;
        break;
      case 'explain':
        systemPrompt = `你是一个专业的代码解释助手，能够用清晰易懂的语言解释代码的功能和原理。请详细解释代码的逻辑、每个部分的作用，以及可能的优化建议。`;
        userPrompt = `请解释以下${language}代码的功能和原理：\n\n\`\`\`${language}\n${code}\n\`\`\``;
        break;
      case 'optimize':
        systemPrompt = `你是一个代码优化专家，能够识别代码中的性能问题和改进空间。请提供优化后的代码，并解释优化的思路和带来的改进。`;
        userPrompt = `请优化以下${language}代码，提高其性能和可读性：\n\n\`\`\`${language}\n${code}\n\`\`\``;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid code processing type' },
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
    console.error('Code assistant API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}