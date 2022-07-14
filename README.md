# rollback-counter
A discord bot that charts rollback lengths and the frames they occured on from .slp replay files
# Usage
- Use this [Oauth2 Url](https://discord.com/api/oauth2/authorize?client_id=989087652949131274&permissions=34816&scope=bot%20applications.commands) to add `rollback-counter` to your server
- Use the `/chart` command and attach a .slp replay file to get a chart of the rollbacks
# Dependencies 
- [slippi-js](https://github.com/project-slippi/slippi-js) - The official .slp replay file parsing library used to extract rollback information.
- [WOKCommands](https://github.com/AlexzanderFlores/WOKCommands) - A simple Discord command handler
- [discord.js](https://discord.js.org/#/) - Discords official node library to interact with their API 
- [chart-js-node-canvas](https://npm.io/package/chartjs-node-canvas) - A node renderer for [chart.js](https://www.chartjs.org/)
