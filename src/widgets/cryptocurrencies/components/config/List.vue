<template>
  <div class="coins__list" :class="{'coins__list--available': !isActive}">
    <div class="coins__list-header" v-if="isActive">Active Cryptocurrencies</div>
    <div class="coins__list-header" v-else>Available Cryptocurrencies</div>

    <div v-if="isActive" class="coins__list-note" :class="{error: maxReached || minReached}">1-15 active cryptocurrencies allowed.</div>
    <div v-else class="coins__list-note" :class="{error: maxReached}">Please remove an active cryptocurrency to create an empty spot before you can activate a new one.</div>

    <draggable
      v-if="isActive"
      :list="coins"
      class="coins__items coins__items--active">

       <ActiveItem
         v-for="symbol in coins"
         :key="symbol"
         :symbol="symbol"
         @remove="remove"
       />
    </draggable>

    <div v-else class="coins__items coins__items--available">
      <AvailableItem
        v-for="coin in filteredCoins"
        :key="coin.Id"
        :coin="coin"
        @add="add"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import ActiveItem from './ActiveItem';
import AvailableItem from './AvailableItem';

export default {
  props: {
    coins: {
      type: Array,
      required: true
    },
    activeCoins: {
      type: Array,
      required: false
    },
    isActive: {
      type: Boolean,
      required: true
    },
    maxReached: {
      type: Boolean,
      required: true
    },
    minReached: {
      type: Boolean,
      required: true
    },
  },
  components: { draggable, ActiveItem, AvailableItem },

  computed: {
    filteredCoins () {
      return this.coins.filter((x) => {
        return this.activeCoins.indexOf(x.Symbol) === -1;
      }).slice(0, 50);
    }
  },

  methods: {
    add (symbol) {
      this.$emit('add', symbol);
    },

    remove (symbol) {
      this.$emit('remove', symbol);
    },
  }
}
</script>

<style lang="scss">
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.coins {
  &__list {
    margin-bottom: 20px;
    width: calc(100%/2 - 25px);

    &--available {
      margin-left: 25px;
    }

    &-header {
      font-size: 1.1333rem;
      color: $darker-text-color;
      letter-spacing: 0.21px;
      line-height: 1.35;
      margin-bottom: 5px;
    }

    &-note {
      font-size: 0.9333rem;
      color: $darker-text-color;
      letter-spacing: 0.21px;
      line-height: 1.2;
      margin-bottom: 5px;
      height: 65px;

      &.error {
        color: $red;
      }
    }
  }

  &__item {
    height: 36px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    background-color: white;

    &.sortable-ghost {
      opacity: 0.5;
      background-color: $lighter-gray;
    }

    & > div {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      flex-shrink: 0;
      flex-grow: 0;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }

    &-action {
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }

    &-title {
      flex-grow: 1 !important;
    }

    &-name {
      @include text-ellipsis();
      font-size: 1.1333rem;
      color: $dark-text-color;
      line-height: 1.2;
    }

    &-handle {
      height: 14px;
      cursor: move;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $lighter-gray;
    }

    &s {
      display: block;
      height: 225px;
      max-height: 225px;
      overflow-y: auto;
      padding-right: 10px;
    }
  }
}
</style>
