# Dagy

## Prerequisites

* Ruby
* Jekyll

## Install

    bundle install

## Develop

    bundle exec jekyll serve --incremental

## Deploy to Firebase

    JEKYLL_ENV=production bundle exec jekyll build && firebase deploy
