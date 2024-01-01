<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label">
        <slot name="label"></slot>
    </label>
    <div class="col-sm-9">
      <slot name="field"></slot>
    </div>
  </div>
</template>