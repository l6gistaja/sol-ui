<template>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">
        <slot name="label"></slot>: 
    </label>
    <div class="col-sm-4">
      <slot name="field"></slot>
    </div>
  </div>
</template>