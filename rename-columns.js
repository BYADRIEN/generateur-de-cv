const Database = require("better-sqlite3");

const db = new Database("./sqlite.db");

db.pragma("foreign_keys=OFF");

const renames = [
  ["user", "emailVerified", "email_verified"],
  ["user", "createdAt", "created_at"],
  ["user", "updatedAt", "updated_at"],

  ["session", "expiresAt", "expires_at"],
  ["session", "createdAt", "created_at"],
  ["session", "updatedAt", "updated_at"],
  ["session", "ipAddress", "ip_address"],
  ["session", "userAgent", "user_agent"],
  ["session", "userId", "user_id"],

  ["account", "accountId", "account_id"],
  ["account", "providerId", "provider_id"],
  ["account", "userId", "user_id"],
  ["account", "accessToken", "access_token"],
  ["account", "refreshToken", "refresh_token"],
  ["account", "idToken", "id_token"],
  ["account", "accessTokenExpiresAt", "access_token_expires_at"],
  ["account", "refreshTokenExpiresAt", "refresh_token_expires_at"],
  ["account", "createdAt", "created_at"],
  ["account", "updatedAt", "updated_at"],

  ["verification", "expiresAt", "expires_at"],
  ["verification", "createdAt", "created_at"],
  ["verification", "updatedAt", "updated_at"]
];

for (const [table, oldName, newName] of renames) {
  db.exec(`ALTER TABLE "${table}" RENAME COLUMN "${oldName}" TO "${newName}"`);
}

db.pragma("foreign_keys=ON");
db.close();

console.log("Colonnes renommées avec succès.");
