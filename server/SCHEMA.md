
# VC Flix — MongoDB Schema Design

## 1. User

Represents a VC Flix user.

- `displayName`: required display name.
- `email`: optional unique email address.
- `partner`: optional reference to another User.
- `createdAt`, `updatedAt`: managed by Mongoose.

## 2. Title

Stores shared movie or TV-show metadata.

- `name`: required title name.
- `type`: `movie` or `tv`.
- `releaseYear`: optional release year.
- `overview`: optional description.
- `genres`: list of genres.

Index: `name`, `releaseYear`, `type`.

## 3. CollectionEntry

Stores one user's personal entry for a title.

- `user`: reference to User.
- `title`: reference to Title.
- `status`: `watched`, `watching`, `plan_to_watch`, or `dropped`.
- `rating`: optional rating from 0 to 10.
- `notes`: private personal notes.
- `posterUrl`: personal poster selection.

Unique index: `user` + `title`.

## 4. WatchlistEntry

Stores an entry in the shared watchlist.

- `title`: reference to Title.
- `addedBy`: reference to User.
- `posterUrl`: shared watchlist poster selection.
- `notes`: shared notes.

Unique index: `title`.

## 5. ShuffleSession

Stores a Shuffle session and its selections.

- `createdBy`: reference to User.
- `status`: `pending`, `revealed`, `completed`, or `cancelled`.
- `selections`: user and title references, plus a reveal flag.
- `revealAt`: optional scheduled reveal time.

Index: `createdBy` + `status`.

## Privacy and authorization

Mongoose schemas define data structure and validation.
They do not enforce application-level access permissions.

The API must authenticate users and authorize every operation:
- Only the owner may edit or delete a personal CollectionEntry.
- Both partners may manage the shared watchlist.
- Personal ratings, statuses, notes, and posters remain separate.
- Shuffle selections must not be exposed before the reveal rules permit it.

## Known follow-up work

- Add server-side authorization and privacy tests.
- Validate that Shuffle selections belong to permitted users.
- Add database integration tests for indexes and persistence.
- Consider storing each selection's reveal state in a structure that enforces session-level reveal rules.
