This app allows save in a database the tracking of records, consumed bye any weppage
Vocabulary:
    - ID: this id is the domain from origin
ENDPOINTS:
 - POST /tracking/{id} -> Save or update the recors depending the ID.
        Body:
        `
            {
                interaction:{
                    name: 'click-en-link',
                }

            }
        `
        OR
        `
            {}
        `
 - GET  /tracking/{id} -> Get the information by ID
 - GET  /tracking -> Get the all information the first 1000 records

.env files
Just contains the
    `
        MONGODB_URI=
        PORT=
    `