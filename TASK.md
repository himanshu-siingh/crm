## Devlopment Flow

### Phase 1

    User Module -> RBAC ->  Employee Module -> Lead Module -> Profile -> Client Module -> Email Module -> Finance Module

- Status : User Module in Progress

### Phase 2

    Projects Module -> Product Module

- Status : Not Started

### Features

#### RBAC

##### Logic

- Fetch Permission From user during login using role and user id
- Store it in a context and JWT in localstorage
- Use it to check permission in each module
- Initiase permission everytime application load if permission is not present using JWT
- Check during routing if permission is present or not
- Pass the level as prop
- Check which level (C,R,U,D) of permission is given to pagr and show accordingly
