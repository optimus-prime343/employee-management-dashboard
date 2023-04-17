## How to run the app ?

- `git clone https://github.com/optimus-prime343/employee-management-dashboard.git`
- Run `npm install` or `yarn`
- Run `docker-compose up -d`
- Create a .env file and set DATABASE_URL to `postgresql://postgres:postgres@localhost:5432/team-employee-db?schema=public`
- Run 'npx prisma migrate dev --name initial`
- Run `yarn dev` or `npm run dev`
