<!-- TODO is based on rubric -->

Develop a Discord bot with enhanced functionalities, focusing on command handling, user
interaction, role management, data management, and moderation tools. The bot should
demonstrate advanced proficiency in interacting with Discord's API and managing server
dynamics.
Tasks

1. [x] Basic Command Handling

- [x] Greeting Command: Implement a command `!hello` that responds with a
      friendly greeting, including the user's display name and a random emoji from a
      predefined list.
- [x] Echo Command: Implement a command !echo [message] that repeats the
      provided message and counts the number of words. Ensure that the message is
      properly sanitized to prevent command injection.

  2.[ ] User Interaction

- - [x] User Info: Create a command !userinfo [@user] that displays detailed
        information about the mentioned user, including their username, ID, join date,
        roles, and whether they are a bot. Handle cases where the user is not mentioned
        or does not exist.

3. [ ] Role Management

- - [ ] Assign Role: Implement a command !assignrole [@user] [role] that
        assigns a specified role to the mentioned user. The bot should verify if the role
        exists and if the bot has the necessary permissions to assign it. Handle cases
        where the role does not exist or the bot lacks permissions.
- - [ ] Remove Role: Implement a command !removerole [@user] [role] that
        removes a specified role from the mentioned user. Similar to assignrole,
        handle edge cases such as non-existent roles or insufficient permissions.

4. [ ] Data Management

- - [ ] Welcome Message: Implement a feature that sends a customizable welcome
        message to users when they join the server. Allow server admins to set and
        update the welcome message via a command !setwelcome [message].
        Store the welcome message in MySQL and fetch it when a user joins.

- - [ ] Store User Data: Implement a feature to store and retrieve user data (e.g.,
        points, experience) in a MySQL database. Create commands !addpoints
        [@user] [points] and !getpoints [@user] to manage and display user
        points. Ensure that data is correctly stored and retrieved.

5. [ ] Moderation Tools

- - [ ] Kick/Ban Command: Implement commands !kick [@user] [reason] and
        !ban [@user] [reason] to kick or ban users from the server. The bot should
        log the actions in a designated channel, including the user, reason, and the
        moderator who issued the command. Handle cases where the bot or the
        moderator lacks permissions.
- - [ ] Mute Command: Implement a command !mute [@user] [duration]
        [reason] that mutes a user for a specified duration. Store the mute end time in
        the database and automatically unmute the user when the time expires. Handle
        cases where the user is already muted.

6. [ ] Additional Requirements

- - [ ] Error Handling: Implement comprehensive error handling for all commands, providing
        clear feedback to the user when something goes wrong (e.g., missing arguments,
        insufficient permissions).
- - [ ] Logging: Implement logging for all commands and actions performed by the bot. Store
        logs in a file or database for audit purposes.
- - [ ] Command Permissions: Implement a permission system where only users with specific
        roles (e.g., admin, moderator) can use certain commands.
