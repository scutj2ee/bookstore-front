
<template>

  <div class="search bar2">
        <form>
            <input type="text" placeholder="请输入您要搜索的内容...">
            <button type="submit"></button>
        </form>
    </div>
</template>
 
<script>
export default {
  data () {
    return {
      input: '',
      select: ''
    };
  }
};
</script>
<style>
@import "http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"
 div.search {padding: 30px 0;}

        form {
            position: relative;
            width: 300px;
            margin: 0 auto;
        }

        input, button {
            border: none;
            outline: none;
        }

        input {
            width: 100%;
            height: 42px;
            padding-left: 13px;
        }

        button {
            height: 42px;
            width: 42px;
            cursor: pointer;
            position: absolute;
        }

     .bar2 {background: #DABB52;}
        .bar2 input, .bar2 button {
            border-radius: 3px;
        }
        .bar2 input {
            background: #F9F0DA;
        }
        .bar2 button {
            height: 26px;
            width: 26px;
            top: 8px;
            right: 8px;
            background: #F15B42;
        }
        .bar2 button:before {
            content: "\f105";
            font-family: FontAwesome;
            color: #F9F0DA;
            font-size: 20px;
            font-weight: bold;
        }

</style>