# repo-tools

### Todo

- figure out why we cannot get the list of repos
- [ ] get latest test report
- [ ] get CPD- lists
- [ ] add pagination to repositories (and possiblity filtering)
- [ ] favourite repositories/organisations?
- [ ] get list of PRs still in progress
  - create a checklist of:
    - repo checks
      - has the repo passed all checks?
    - repo has been reviewed
      - take repo settings into account regarding stale reviews
    - repo has passed e2e
      - look at the amount of failing tests, and remember to check if it's been run multiple times
    - is up to date with master (based on repo settings)
      - check if the repo has been updated since the PR was created
    - has been deployed
      - to stage
      - to prod
    - get list of all translation keys, from a PR, so we can see if the translation keys are entered on all languages
  - parse BE template: https://github.com/cardlay/nebula-core/pull/326
  -
