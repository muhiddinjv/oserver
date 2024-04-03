## How to start the server
1. Open [Docker](https://docs.docker.com/desktop/install/windows-install/) and remove any running containers ``docker ps -a`` and ``docker stop/rm container-id-here``
2. Run postgresql remote image in docker using terminal: 
```docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres```
3. In [Dbeaver](https://dbeaver.io/download/), create a postgres db collection with password & name = ``postgres``
4. Create a db called ```olliodb``` in postgres 
5. ```npm run dev``` OR ```yarn dev``` you'll see query logs in the terminal


### Workflow
1. name.entity
2. name.service
3. name.controller
4. name.module
5. name.guard
6. app.module

### Git commit message types (best practice)
- **feat**: add a feature
- **fix**: bug fixes
- **docs**: update docs like README
- **style**: style or formatting change 
- **perf**: improve code performance
- **refac**: refactor some code
- **test**: test a feature
- **chore**: regular code maintenance
- **hotfix**: used to quickly patch production releases