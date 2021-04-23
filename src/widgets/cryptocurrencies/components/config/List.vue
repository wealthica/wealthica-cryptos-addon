<template>
  <div class="coins__list" :class="{ 'coins__list--available': !isActive }">
    <div v-if="isActive" class="coins__list-header">
      {{ $t("active_cryptocurrencies") }}
    </div>
    <div v-else class="coins__list-header">
      {{ $t("available_cryptocurrencies") }}
    </div>

    <div v-if="isActive" class="coins__list-note" :class="{ error: maxReached || minReached }">
      {{
        $t("num_active_cryptocurrencies_allowed", null, {
          min: minActiveCoins,
          max: maxActiveCoins
        })
      }}
    </div>
    <div v-else class="coins__list-note">
      <input
        v-model="search"
        type="text"
        class="coins__search"
        :placeholder="$t('search_placeholder')"
      />
    </div>

    <draggable v-if="isActive" :list="coins" class="coins__items coins__items--active">
      <ActiveItem v-for="symbol in coins" :key="symbol" :symbol="symbol" @remove="remove" />
    </draggable>

    <div v-else-if="filteredCoins.length" class="coins__items coins__items--available">
      <AvailableItem v-for="coin in filteredCoins" :key="coin.Id" :coin="coin" @add="add" />

      <div v-if="!filteredCoins.length && coins.length" class="coins__search-no-result">
        {{ $t("nothing_matched") }}
      </div>
    </div>

    <div v-else-if="coins.length" class="coins__items coins__items--available">
      <div class="coins__search-no-result">
        {{ $t("nothing_matched") }}
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import * as constants from "../../constants";
import ActiveItem from "./ActiveItem.vue";
import AvailableItem from "./AvailableItem.vue";

export default {
  components: { draggable, ActiveItem, AvailableItem },
  props: {
    coins: {
      type: Array,
      required: true
    },
    activeCoins: {
      type: Array,
      required: false,
      default: () => []
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
    }
  },

  data() {
    return {
      search: ""
    };
  },

  computed: {
    filteredCoins() {
      let { search } = this;

      const filteredCoins = this.coins.filter(x => {
        const isInactive = this.activeCoins.indexOf(x.Symbol) === -1;
        let matched = true;
        if (search && search.length) {
          search = search.toLowerCase();
          matched =
            x.CoinName.toLowerCase().indexOf(search) > -1 ||
            x.Symbol.toLowerCase().indexOf(search) > -1;
        }

        return matched && isInactive;
      });

      // show max 50 results
      return filteredCoins.slice(0, 50);
    },
    minActiveCoins() {
      return constants.MIN_ACTIVE_COINS;
    },
    maxActiveCoins() {
      return constants.MAX_ACTIVE_COINS;
    }
  },

  methods: {
    add(symbol) {
      this.$emit("add", symbol);
    },

    remove(symbol) {
      this.$emit("remove", symbol);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.coins {
  &__list {
    margin-bottom: 20px;
    width: calc((100% - 25px) / 2);

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
      height: 45px;

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
      width: 0;
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

  &__search {
    padding-left: 10px;
    padding-right: 10px;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    height: 36px;
    line-height: 36px;
    font-size: 0.9333rem;
    text-transform: none;
    border: 1px solid $border-color;
    background-color: white;
    color: $dark-text-color;
    outline: 0;
    border-radius: 3px;

    @include placeholder() {
      color: $light-text-color !important;
      font-weight: normal !important;
    }

    &-no-result {
      font-size: 0.9333rem;
      color: $darker-text-color;
    }
  }
}
</style>
