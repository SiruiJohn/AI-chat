import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { type, input } = await request.json();

    if (!type || !input) {
      return NextResponse.json(
        { error: 'Type and input are required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'email':
        systemPrompt = '你是一个专业的邮件撰写助手，能够根据需求撰写各种类型的邮件。请撰写结构清晰、语气恰当、内容完整的邮件。';
        userPrompt = `请根据以下需求撰写一封邮件：\n\n${input}`;
        break;
      case 'meeting':
        systemPrompt = '你是一个会议纪要专家，能够整理和总结会议内容。请根据会议信息生成结构化的会议纪要，包含主要议题、讨论要点、决策和行动项。';
        userPrompt = `请根据以下会议信息整理会议纪要：\n\n${input}`;
        break;
      case 'study':
        systemPrompt = '你是一个学习助手，能够提供学习建议和方法指导。请根据学习需求提供个性化的学习计划、方法和资源建议。';
        userPrompt = `请为以下学习需求提供建议：\n\n${input}`;
        break;
      case 'health':
        systemPrompt = '你是一个健康顾问，能够提供健康生活建议。请注意你的建议应该是一般性的健康指导，不能替代专业医疗建议。';
        userPrompt = `请为以下健康需求提供一般性建议：\n\n${input}`;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid utility tool type' },
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
    console.error('Utility tools API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}