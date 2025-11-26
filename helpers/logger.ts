import { Page } from '@playwright/test';
import chalk from 'chalk';

export const color = {
    assert: chalk.hex('#0EFFCE'),
    success: chalk.bold.hex('#0EF15D'),
    error: chalk.bold.hex('#E4271B'),
    warning: chalk.bold.hex('#FFA500'),
    info: chalk.hex('#A020F0'),
    outgoingRequest: chalk.hex('#0560fc'),
    incomingRequest: chalk.hex('#fcf805'),
    request: chalk.hex('#0560fc'),
    response: chalk.hex('#fcf805'),
    dbQuery: chalk.hex('#30CAD2'),
    dbResult: chalk.hex('#1BDDA8')
};

export class RequestLogger {
    static logRequest(requestType: string, url: string, data?: any) {
        console.log(color.request(`\n>>> REQUEST >>>`));
        console.log(color.request(`Request type: ${requestType}`));
        console.log(color.request(`Request URL: ${url}`));
        if (data) console.log(color.request(`Request body:\n` + JSON.stringify(data, null, 2)));
    }

    static logResponse(status: number, data?: any) {
        console.log(color.response(`\n<<< RESPONSE <<<`));
        console.log(color.response(`Status code: ${status}`));
        if (data) console.log(color.response(`Response body:\n` + JSON.stringify(data, null, 2)));
    }
}   

export async function pageLogger(page: Page){
  page.on('request', request => 
    console.log(color.outgoingRequest('>>', request.method(), request.url()))
  )
  page.on('response', response =>
    console.log(color.incomingRequest('<<', response.status(), response.url()))
  )
  page.on('console', msg => {
    if(msg.type() == 'error'){
      console.log(color.error(msg.text()))
    }
  })
}