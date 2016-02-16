'use strict';

angular.module('todoList.index', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexCtrl'
    });
}])

.controller('IndexCtrl', function ($scope, localStorageService) {
    // Todos
    var todosInStore = localStorageService.get('todos');
    $scope.todos = todosInStore || [];
    $scope.$watch('todos', function () {
        localStorageService.set('todos', $scope.todos);
    }, true);

    // Todos marked as done
    var todosInDone = localStorageService.get('doneTodos');
    $scope.doneTodos = todosInDone || [];
    $scope.$watch('doneTodos', function () {
        localStorageService.set('doneTodos', $scope.doneTodos);
    }, true);

    $scope.addTodo = function () {
        // Check if todo already exists
        if ($scope.todo.trim() !== '') {
            if ($scope.todos.indexOf($scope.todo) === -1) {
                $scope.todos.push($scope.todo);
                $scope.todo = '';
            }
        }
    };

    $scope.addTodoDone = function (todo) {
        // Check if todo already exists
        if (todo.name.trim() !== '') {
            $scope.doneTodos.push(todo);
        }
    };

    // function to evaluate if a todo already exists
    $scope.checkExistsTodo = function (value) {
        if ($scope.todos.indexOf(value) === -1)
            return true;
        else
            return false;
    };

    // function to remove a todo
    $scope.removeTodo = function (index) {
        if (typeof $scope.todos[index] !== 'undefined') {
            $scope.todos.splice(index, 1);
        }
    };

    // function to remove a todo done
    $scope.removeDoneTodo = function (index) {
        if (typeof $scope.doneTodos[index] !== 'undefined') {
            $scope.doneTodos.splice(index, 1);
        }
    };

    // function to update a todo
    $scope.updateTodo = function (index, todo) {
        if (typeof $scope.todos[index] !== 'undefined') {
            $scope.todos[index] = todo;
        }
    };

    // function to mark todo as done
    $scope.markDoneTodo = function (index) {
        var obj = { name: $scope.todos[index], date: new Date() };
        $scope.addTodoDone(obj);
        console.log(obj);
        $scope.removeTodo(index);
    }
});
