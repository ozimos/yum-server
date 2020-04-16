import crypto from 'crypto';
import { execSync } from 'child_process';
/* eslint-disable no-console */
export default function gitwebhook(req, res) {
    const hmac = crypto.createHmac('sha1', process.env.SECRET);
    const sig = `sha1=${hmac.update(JSON.stringify(req.body)).digest('hex')}`;
    if (
        req.headers['x-github-event'] === 'pull_request' &&
        crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(req.headers['x-hub-signature']))
    ) {
        res.sendStatus(200);
        const {
            action,
            pull_request: { merged },
        } = req.body;
        if (action === 'closed' && merged) {
            const commands = [
                'git fetch origin master',
                'git reset --hard origin/master',
                'git pull origin master --force',
                'npm run migrate --env=production',
                'npm install',
                'refresh',
            ];
            commands.forEach((cmd) => console.log(execSync(cmd).toString()));
            console.log('updated with origin/master!');
        }
    } else {
        console.log('webhook signature incorrect!');
        return res.sendStatus(403);
    }
}
