<template>
  <div class="content">
    <h1>Tasky</h1>
    <div class="white-box">
      <h2>My list</h2>
        <div class="task-list">
        </div>
        <div class="add-task">
            <label>New Task:</label>
            <span class="task-name"><input type="text" name="task_name" maxlength="100"></span>
            <button class="add-task button" type="button">Add new Task</button>
            <button class="delete-all button" type="button">Delete All</button>
        </div>
    </div>
</div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
  @import '../styles/styles.scss';
</style>
