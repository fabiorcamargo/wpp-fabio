import { ServerOptions } from './types/ServerOptions';
import * as dotenv from 'dotenv';

// garante que o .env seja lido mesmo se importar config.ts direto
dotenv.config();

const getEnvOrDefault = (key: string, defaultValue: string): string => {
  const value = process.env[key] || defaultValue;
  console.log(`[DEBUG] ${key} = ${value}`); // 👈 debug
  return value;
};

console.log('SECRET_KEY:', process.env.SECRET_KEY);

export default {
  secretKey: getEnvOrDefault('SECRET_KEY', 'THISISMYSECURETOKEN'),
  host: getEnvOrDefault('HOST', 'https://meuservidor.com'),
  port: getEnvOrDefault('PORT', '21465'),
  deviceName: 'WppConnect',
  poweredBy: 'WPPConnect-Server',
  startAllSession: true,

  // Armazenamento de sessão no S3
  tokenStoreType: 's3',

  maxListeners: 15,

  // Não usamos pasta local
  customUserDataDir: '',

  webhook: {
    url: getEnvOrDefault('WEBHOOK_URL', ''),
    autoDownload: true,
    uploadS3: true, // envia mídia direto para o S3
    readMessage: false,
    allUnreadOnStart: false,
    listenAcks: false,
    onPresenceChanged: false,
    onParticipantsChanged: false,
    onReactionMessage: false,
    onPollResponse: false,
    onRevokedMessage: false,
    onLabelUpdated: false,
    onSelfMessage: false,
    ignore: ['status@broadcast'],
  },

  websocket: {
    autoDownload: true,
    uploadS3: true,
  },

  chatwoot: {
    sendQrCode: true,
    sendStatus: true,
  },

  archive: {
    enable: false,
    waitTime: 10,
    daysToArchive: 45,
  },

  log: {
    level: 'silly',
    logger: ['console', 'file'],
  },

  createOptions: {
    browserArgs: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-sync',
      '--mute-audio',
      '--headless',
    ],
    headless: true,
    devtools: false,
    linkPreviewApiServers: null,
  },

  mapper: {
    enable: false,
    prefix: 'tagone-',
  },

  db: {
    mongodbDatabase: 'tokens',
    mongoIsRemote: true,
  },

  aws_s3: {
    region: getEnvOrDefault('AWS_REGION', 'sa-east-1') as any,
    access_key_id: getEnvOrDefault('AWS_ACCESS_KEY_ID', ''),
    secret_key: getEnvOrDefault('AWS_SECRET_ACCESS_KEY', ''),
    defaultBucketName: getEnvOrDefault('AWS_BUCKET_NAME', ''),
    endpoint: getEnvOrDefault('AWS_S3_ENDPOINT', ''),
    forcePathStyle: true,
  },
} as unknown as ServerOptions;
