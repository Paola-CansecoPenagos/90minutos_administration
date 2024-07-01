import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// Cargar las credenciales desde el archivo JSON
const credentialsPath = path.join(__dirname, 'client_secret.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

function getAuthUrl(): string {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

function getNewToken(oAuth2Client: OAuth2Client): Promise<void> {
  return new Promise((resolve, reject) => {
    const authUrl = getAuthUrl();
    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          console.error('Error retrieving access token', err);
          reject(err);
          return;
        }
        oAuth2Client.setCredentials(token!);
        // Guardar el token en un archivo para uso futuro
        fs.writeFileSync(tokenPath, JSON.stringify(token));
        console.log('Token stored to', tokenPath);
        resolve();
      });
    });
  });
}

const tokenPath = path.join(__dirname, 'token.json');

function authorize(): Promise<OAuth2Client> {
  return new Promise((resolve, reject) => {
    // Comprobar si tenemos un token previamente guardado
    if (fs.existsSync(tokenPath)) {
      const token = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
      oAuth2Client.setCredentials(token);
      resolve(oAuth2Client);
    } else {
      // Si no hay token guardado, obtener uno nuevo
      getNewToken(oAuth2Client).then(() => resolve(oAuth2Client)).catch(reject);
    }
  });
}

export async function getSheetData(): Promise<any[]> {
  const auth = await authorize();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1FAIpQLSdQnu4IWuhSpEmUs9StgZQERdmLNkvyfv1Lmb7gMqIktwHJOg'; 
  const range = 'Hoja1!A1:D10'; // Reemplaza con el rango que necesites

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;
  if (rows && rows.length) {
    return rows;
  } else {
    throw new Error('No se encontraron datos.');
  }
}
