/**
 * Scrape Dibuat Oleh Alpian
 * Contact Dev : +6287781287196
 * Saluran : https://whatsapp.com/channel/0029VbB0x9f4dTnIDQIMee31
 */

const axios = require('axios');

class PteroCreate {
  constructor(domain, apikey) {
    this.domain = domain;
    this.headers = {
      'Authorization': `Bearer ${apikey}`,
      'Content-Type': 'application/json',
      'Accept': 'Application/vnd.pterodactyl.v1+json'
    };
  }

  async getEggStartup(nestId, eggId) {
    const url = `${this.domain}/api/application/nests/${nestId}/eggs/${eggId}`;
    const res = await axios.get(url, { headers: this.headers });
    return res.data.attributes;
  }

  async createUser(email, username, password, rootAdmin = false) {
    const url = `${this.domain}/api/application/users`;
    const payload = {
      email,
      username,
      first_name: 'Auto',
      last_name: 'User',
      password,
      root_admin: rootAdmin
    };
    const res = await axios.post(url, payload, { headers: this.headers });
    return res.data.attributes;
  }

  async createServer(data) {
    const url = `${this.domain}/api/application/servers`;
    const res = await axios.post(url, data, { headers: this.headers });
    return res.data.attributes;
  }
}

module.exports = function (app) {
  app.get('/tools/panel', async (req, res) => {
    const { domain, apikeyptero, capikeyptero, nameserver, disk, cpu, password, rootadmin } = req.query;

    if (!domain || !apikeyptero || !capikeyptero || !nameserver || !disk || !cpu || !password) {
      return res.json({ status: false, author: 'Alpian', error: 'Semua parameter wajib diisi!' });
    }

    const nestid = 5;
    const eggid = 15;
    const locid = 1;

    try {
      const creator = new PteroCreate(domain, apikeyptero);

      const username = nameserver.toLowerCase().replace(/[^a-zA-Z0-9]/g, '') + Math.floor(Math.random() * 1000);
      const email = `${username}@mail.com`;

      const eggData = await creator.getEggStartup(nestid, eggid);
      const startup = eggData.startup;
      const environment = {};

      if (Array.isArray(eggData.variables)) {
        eggData.variables.forEach(v => {
          if (v.env_variable === "CMD_RUN") {
            environment[v.env_variable] = "npm start";
          } else {
            environment[v.env_variable] = v.default_value || "";
          }
        });
      }

      if (!environment["CMD_RUN"]) {
        environment["CMD_RUN"] = "npm start";
      }

      const rootAdminFlag = rootadmin === "true";

      const user = await creator.createUser(email, username, password, rootAdminFlag);

      const serverPayload = {
        name: nameserver,
        user: user.id,
        egg: eggid,
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup,
        environment,
        limits: {
          memory: parseInt(disk),
          swap: 0,
          disk: parseInt(disk),
          io: 500,
          cpu: parseInt(cpu)
        },
        feature_limits: {
          databases: 1,
          allocations: 1,
          backups: 1
        },
        deploy: {
          locations: [locid],
          dedicated_ip: false,
          port_range: []
        },
        start_on_completion: true
      };

      const server = await creator.createServer(serverPayload);

      res.json({
        status: true,
        author: 'Alpian',
        contact: '6287781287196',
        scrape: 'https://whatsapp.com/channel/0029VbB0x9f4dTnIDQIMee31',
        data: {
          id_user: user.id,
          id_server: server.id,
          nama_server: nameserver,
          domain_panel: domain,
          username: user.username,
          password,
          root_admin: user.root_admin
        }
      });

    } catch (err) {
      res.status(500).json({
        status: false,
        author: 'Alpian',
        contact: '6287781287196',
        scrape: 'https://whatsapp.com/channel/0029VbB0x9f4dTnIDQIMee31',
        error: err.response?.data || err.message
      });
    }
  });
};
