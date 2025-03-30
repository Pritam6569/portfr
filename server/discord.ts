import axios from 'axios';
import { log } from './vite';

interface VisitorInfo {
  ip: string;
  userAgent: string;
  timestamp: string;
  path: string;
}

export async function sendToDiscord(webhookUrl: string, visitorInfo: VisitorInfo) {
  try {
    const embed = {
      title: '🔍 New Website Visitor',
      color: 0x4DA8FF,
      fields: [
        { name: 'IP Address', value: visitorInfo.ip, inline: true },
        { name: 'Path', value: visitorInfo.path || '/', inline: true },
        { name: 'User Agent', value: visitorInfo.userAgent },
        { name: 'Timestamp', value: visitorInfo.timestamp }
      ],
      footer: {
        text: 'Visitor Tracking System'
      }
    };

    await axios.post(webhookUrl, {
      embeds: [embed]
    });

    log(`Sent visitor info to Discord webhook: ${visitorInfo.ip}`);
  } catch (error) {
    log(`Error sending to Discord webhook: ${(error as Error).message}`);
    throw error;
  }
}
