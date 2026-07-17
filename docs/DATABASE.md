# Database Design

## Collections

### User

Stores all platform users.

Fields:

- _id
- fullName
- email
- password
- role
- phone
- avatar
- ngoId
- isVerified
- status
- createdAt
- updatedAt

---

### NGO

Stores NGO information.

Fields:

- _id
- name
- description
- email
- phone
- address
- website
- logo
- createdAt

---

### ReliefRequest

Stores victim requests.

Fields:

- _id
- victimId
- title
- description
- category
- urgency
- location
- status
- assignedVolunteer
- assignedNGO
- createdAt
- updatedAt

---

### Resource

Stores available relief resources.

Fields:

- _id
- ngoId
- resourceType
- quantity
- unit
- location
- availability
- updatedAt

---

### Assignment

Stores volunteer assignments.

Fields:

- _id
- requestId
- volunteerId
- assignedBy
- status
- assignedAt
- completedAt

---

### Notification

Stores notifications.

Fields:

- _id
- userId
- title
- message
- isRead
- createdAt