class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: %i[show destroy edit update]

  def index
    tasks = Task.all.order(created_at: :desc)
    render json: tasks
  end

  def create
    task = Task.create!(task_params)
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def edit
    render json: {task: @task, due_date: @task.due_date, status: @task.status}
  end

  def update
    if @task.update(task_update_params)
      render json: @task
    else
      render json: @task.errors
    end
  end

  def show
    render json: @task
  end

  def destroy
    @task&.destroy
    render json: { message: 'Task deleted!' }
  end

  private

  def task_params
    params.permit(:title, :description, :due_date, :status)
  end

  def task_update_params
    params.permit(:due_date, :status)
  end

  def set_task
    @task = Task.find(params[:id])
  end
end
